import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { JSONContent } from '@tiptap/react';
import { useBeforeUnload, useBlocker } from 'react-router';

import {
  createStorativaChapter,
  deleteStorativaChapter,
  reorderStorativaChapters,
  updateStorativaChapter,
} from '@/services/storativa.service';
import type { Chapter, IResStorativa } from '@/interfaces/storativa.interface';
import type { SaveState } from '@/constants/common/edition.constants';
import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { legacyContentToJson } from '@/utils/editionContent';

const sortChapters = (chapters: Chapter[]) =>
  [...chapters].sort((first, second) => first.order - second.order);

export const useEditionSession = (storativa: IResStorativa) => {
  const isSettingsPanelOpen = useOverlayPanelStore(
    (state) => state.activePanel === 'settings',
  );
  const loadedChapters = storativa.chapters ?? [];
  const [chapters, setChapters] = useState<Chapter[]>(() =>
    sortChapters(loadedChapters),
  );
  const [activeChapterId, setActiveChapterId] = useState(
    () => sortChapters(loadedChapters)[0]?._id ?? '',
  );
  const [saveState, setSaveState] = useState<SaveState>('saved');
  const [chapterError, setChapterError] = useState<string | null>(null);
  const [initializationError, setInitializationError] = useState<string | null>(
    null,
  );
  const [isInitializing, setIsInitializing] = useState(
    loadedChapters.length === 0,
  );
  const [isChapterMutation, setIsChapterMutation] = useState(false);
  const initializationStartedRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSaveRef = useRef<{
    chapterId: string;
    content: JSONContent;
  } | null>(null);
  const savePromiseRef = useRef<Promise<boolean> | null>(null);

  const activeChapter = useMemo(
    () => chapters.find((chapter) => chapter._id === activeChapterId),
    [activeChapterId, chapters],
  );
  const initializeFirstChapter = useCallback(async () => {
    if (initializationStartedRef.current) return;

    initializationStartedRef.current = true;
    setIsInitializing(true);
    setInitializationError(null);

    try {
      const chapter = await createStorativaChapter(storativa._id, {
        title: 'Capítulo 1',
        content: legacyContentToJson(storativa.content || ''),
      });
      setChapters([chapter]);
      setActiveChapterId(chapter._id);
    } catch (error: unknown) {
      setInitializationError(
        getErrorMessage(
          error,
          'No pudimos preparar el primer capítulo. Intenta de nuevo.',
        ),
      );
    } finally {
      setIsInitializing(false);
    }
  }, [storativa._id, storativa.content]);

  useEffect(() => {
    if (loadedChapters.length === 0) {
      void initializeFirstChapter();
    }
  }, [initializeFirstChapter, loadedChapters.length]);

  const persistPending = useCallback(async (): Promise<boolean> => {
    if (savePromiseRef.current) return savePromiseRef.current;

    const pending = pendingSaveRef.current;
    if (!pending) return true;

    pendingSaveRef.current = null;
    setSaveState('saving');

    const request = updateStorativaChapter(storativa._id, pending.chapterId, {
      content: pending.content,
    })
      .then(() => {
        setSaveState(pendingSaveRef.current ? 'dirty' : 'saved');
        return true;
      })
      .catch(() => {
        if (!pendingSaveRef.current) pendingSaveRef.current = pending;
        setSaveState('error');
        return false;
      })
      .finally(() => {
        savePromiseRef.current = null;
      });

    savePromiseRef.current = request;
    return request;
  }, [storativa._id]);

  const flushPending = useCallback(async (): Promise<boolean> => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    if (savePromiseRef.current) {
      const existingSaveSucceeded = await savePromiseRef.current;
      if (!existingSaveSucceeded) return false;
    }

    while (pendingSaveRef.current) {
      const saveSucceeded = await persistPending();
      if (!saveSucceeded) return false;
    }

    return true;
  }, [persistPending]);

  const updateContent = useCallback(
    (content: JSONContent) => {
      if (!activeChapterId) return;

      setChapters((current) =>
        current.map((chapter) =>
          chapter._id === activeChapterId ? { ...chapter, content } : chapter,
        ),
      );
      pendingSaveRef.current = { chapterId: activeChapterId, content };
      setSaveState('dirty');

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        void flushPending();
      }, 1000);
    },
    [activeChapterId, flushPending],
  );

  useEffect(
    () => () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    },
    [],
  );

  const hasUnsavedChanges =
    saveState === 'dirty' || saveState === 'saving' || saveState === 'error';

  useBeforeUnload(
    useCallback(
      (event) => {
        if (!hasUnsavedChanges) return;
        event.preventDefault();
        event.returnValue = '';
      },
      [hasUnsavedChanges],
    ),
  );

  const blocker = useBlocker(hasUnsavedChanges);
  useEffect(() => {
    if (blocker.state !== 'blocked') return;

    const shouldLeave = window.confirm(
      'Hay cambios pendientes. ¿Quieres guardarlos y salir?',
    );
    if (!shouldLeave) {
      blocker.reset();
      return;
    }

    void flushPending().then((saved) => {
      if (saved) blocker.proceed();
      else blocker.reset();
    });
  }, [blocker.proceed, blocker.reset, blocker.state, flushPending]);

  const selectChapter = useCallback(
    async (chapterId: string) => {
      if (chapterId === activeChapterId) return true;
      if (!(await flushPending())) return false;

      setActiveChapterId(chapterId);
      return true;
    },
    [activeChapterId, flushPending],
  );

  const addChapter = useCallback(async () => {
    if (!(await flushPending())) return;

    setChapterError(null);
    setIsChapterMutation(true);
    try {
      const chapter = await createStorativaChapter(storativa._id);
      setChapters((current) => [...current, chapter]);
      setActiveChapterId(chapter._id);
    } catch (error: unknown) {
      setChapterError(getErrorMessage(error, 'No pudimos crear el capítulo.'));
    } finally {
      setIsChapterMutation(false);
    }
  }, [flushPending, storativa._id]);

  const renameChapter = useCallback(
    async (chapterId: string, title: string) => {
      if (!(await flushPending())) return false;

      setChapterError(null);
      setIsChapterMutation(true);
      try {
        const updatedChapter = await updateStorativaChapter(
          storativa._id,
          chapterId,
          { title },
        );
        setChapters((current) =>
          current.map((chapter) =>
            chapter._id === chapterId ? updatedChapter : chapter,
          ),
        );
        return true;
      } catch (error: unknown) {
        setChapterError(
          getErrorMessage(error, 'No pudimos renombrar el capítulo.'),
        );
        return false;
      } finally {
        setIsChapterMutation(false);
      }
    },
    [flushPending, storativa._id],
  );

  const deleteChapter = useCallback(
    async (chapterId: string) => {
      if (!(await flushPending())) return;

      setChapterError(null);
      setIsChapterMutation(true);
      try {
        const remainingChapters = sortChapters(
          await deleteStorativaChapter(storativa._id, chapterId),
        );
        setChapters(remainingChapters);
        if (activeChapterId === chapterId) {
          setActiveChapterId(remainingChapters[0]?._id ?? '');
        }
      } catch (error: unknown) {
        setChapterError(
          getErrorMessage(error, 'No pudimos eliminar el capítulo.'),
        );
      } finally {
        setIsChapterMutation(false);
      }
    },
    [activeChapterId, flushPending, storativa._id],
  );

  const moveChapter = useCallback(
    async (chapterId: string, direction: -1 | 1) => {
      if (!(await flushPending())) return;

      const currentIndex = chapters.findIndex(
        (chapter) => chapter._id === chapterId,
      );
      const targetIndex = currentIndex + direction;
      if (
        currentIndex < 0 ||
        targetIndex < 0 ||
        targetIndex >= chapters.length
      ) {
        return;
      }

      const reordered = [...chapters];
      const [movedChapter] = reordered.splice(currentIndex, 1);
      reordered.splice(targetIndex, 0, movedChapter);

      setChapterError(null);
      setIsChapterMutation(true);
      try {
        const savedChapters = await reorderStorativaChapters(
          storativa._id,
          reordered.map((chapter) => chapter._id),
        );
        setChapters(sortChapters(savedChapters));
      } catch (error: unknown) {
        setChapterError(
          getErrorMessage(
            error,
            'No pudimos cambiar el orden de los capítulos.',
          ),
        );
      } finally {
        setIsChapterMutation(false);
      }
    },
    [chapters, flushPending, storativa._id],
  );

  const retryInitialization = useCallback(() => {
    initializationStartedRef.current = false;
    void initializeFirstChapter();
  }, [initializeFirstChapter]);

  const isChapterLocked =
    isSettingsPanelOpen ||
    isChapterMutation ||
    saveState === 'saving' ||
    saveState === 'error';

  return {
    chapters,
    activeChapter,
    activeChapterId,
    saveState,
    chapterError,
    isInitializing,
    initializationError,
    isChapterLocked,
    selectChapter,
    addChapter,
    renameChapter,
    deleteChapter,
    moveChapter,
    updateContent,
    retrySave: flushPending,
    retryInitialization,
  };
};
