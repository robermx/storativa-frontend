import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { JSONContent } from '@tiptap/react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  RotateCcw,
} from 'lucide-react';
import {
  isRouteErrorResponse,
  NavLink,
  useBeforeUnload,
  useBlocker,
  useLoaderData,
  useNavigate,
  useRouteError,
} from 'react-router';

import { createClientLoader } from '@/lib/createClientLoader';
import {
  createStorativaChapter,
  deleteStorativaChapter,
  getUserStorativa,
  reorderStorativaChapters,
  updateStorativaChapter,
} from '@/services/storativa.service';
import type { Chapter } from '@/interfaces/storativa.interface';
import { useSettingsStore } from '@/store/settingsStore';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { titleFormat } from '@/utils/titleFormat';
import ChapterSidebar from '@/components/edition/ChapterSidebar';
import RichTextEditor from '@/components/edition/RichTextEditor';
import EditionSkeleton from '@/components/skeleton/EditionSkeleton';
import { useNavHeight } from '@/store/navHeightStore';

const EMPTY_EDITOR_CONTENT: JSONContent = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

type SaveState = 'saved' | 'dirty' | 'saving' | 'error';

// eslint-disable-next-line react-refresh/only-export-components
export const clientLoader = createClientLoader({
  services: [
    {
      key: 'storativa',
      fn: ({ params }) => {
        const storativaId = params.storativaId;
        if (!storativaId) {
          throw new Response('Falta el identificador de la Storativa.', {
            status: 400,
          });
        }
        return getUserStorativa(storativaId);
      },
    },
  ],
});

export const HydrateFallback = () => <EditionSkeleton />;

const legacyContentToJson = (content: string): JSONContent => {
  const normalized = content.trim();
  const isPlaceholder = normalized.toLowerCase() === 'are you ready for this?';

  if (!normalized || isPlaceholder) return EMPTY_EDITOR_CONTENT;

  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: normalized }],
      },
    ],
  };
};

const sortChapters = (chapters: Chapter[]) =>
  [...chapters].sort((first, second) => first.order - second.order);

const Edition = () => {
  const { storativa } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);
  const navHeight = useNavHeight((state) => state.navHeight);

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
    if (loadedChapters.length === 0) void initializeFirstChapter();
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

  const handleContentChange = useCallback(
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
  }, [blocker.state, blocker.proceed, blocker.reset, flushPending]);

  const selectChapter = async (chapterId: string) => {
    if (chapterId === activeChapterId) return;
    if (await flushPending()) setActiveChapterId(chapterId);
  };

  const addChapter = async () => {
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
  };

  const renameChapter = async (chapterId: string, title: string) => {
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
  };

  const deleteChapter = async (chapterId: string) => {
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
  };

  const moveChapter = async (chapterId: string, direction: -1 | 1) => {
    if (!(await flushPending())) return;
    const currentIndex = chapters.findIndex(
      (chapter) => chapter._id === chapterId,
    );
    const targetIndex = currentIndex + direction;
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= chapters.length) {
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
        getErrorMessage(error, 'No pudimos cambiar el orden de los capítulos.'),
      );
    } finally {
      setIsChapterMutation(false);
    }
  };

  const savePresentation = {
    saved: {
      label: 'Guardado',
      className: 'text-emerald-700 dark:text-emerald-300',
      Icon: CheckCircle2,
    },
    dirty: {
      label: 'Cambios pendientes',
      className: 'text-amber-700 dark:text-amber-300',
      Icon: AlertCircle,
    },
    saving: {
      label: 'Guardando…',
      className: 'text-primary',
      Icon: LoaderCircle,
    },
    error: {
      label: 'No se pudo guardar',
      className: 'text-red-700 dark:text-red-300',
      Icon: AlertCircle,
    },
  }[saveState];

  if (isInitializing || !activeChapter) {
    return initializationError ? (
      <div className="mx-auto flex min-h-dvh max-w-xl items-center px-6">
        <div className="w-full rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center">
          <AlertCircle className="mx-auto text-red-500" size={36} />
          <h1 className="mt-3 text-xl font-semibold">
            No pudimos preparar tu editor
          </h1>
          <p className="mt-2 text-sm text-dark/65 dark:text-light/65">
            {initializationError}
          </p>
          <button
            type="button"
            onClick={() => {
              initializationStartedRef.current = false;
              void initializeFirstChapter();
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-light"
          >
            <RotateCcw size={18} /> Reintentar
          </button>
        </div>
      </div>
    ) : (
      <EditionSkeleton />
    );
  }

  const isChapterLocked =
    areSettingsOpen ||
    isChapterMutation ||
    saveState === 'saving' ||
    saveState === 'error';

  return (
    <div
      aria-hidden={areSettingsOpen}
      inert={areSettingsOpen}
      className={`mx-auto max-w-full p-6 h-[calc(100vh-${navHeight}px)]`}
      style={{ top: navHeight }}
    >
      <header className="mb-6 flex flex-col gap-4 rounded-xl border border-dark/10 bg-primary/10 p-5 dark:border-light/10 dark:bg-primary/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            aria-label="Volver al dashboard"
            className="shrink-0 rounded-md p-2 text-dark/60 transition hover:bg-primary/10 hover:text-primary dark:text-light/60"
          >
            <ArrowLeft size={21} />
          </button>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Espacio de edición
            </p>
            <h1 className="truncate text-xl font-semibold text-dark dark:text-light sm:text-2xl">
              {titleFormat(storativa.title)}
            </h1>
          </div>
        </div>

        <div
          aria-live="polite"
          className={`flex items-center gap-2 text-sm font-medium ${savePresentation.className}`}
        >
          <savePresentation.Icon
            size={18}
            className={saveState === 'saving' ? 'animate-spin' : undefined}
          />
          <span>{savePresentation.label}</span>
          {saveState === 'error' && (
            <button
              type="button"
              onClick={() => void flushPending()}
              className="ml-1 underline underline-offset-2"
            >
              Reintentar
            </button>
          )}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <ChapterSidebar
          chapters={chapters}
          activeChapterId={activeChapterId}
          isLocked={isChapterLocked}
          error={chapterError}
          onSelect={selectChapter}
          onAdd={addChapter}
          onRename={renameChapter}
          onDelete={deleteChapter}
          onMove={moveChapter}
        />
        <section aria-label={`Edición de ${activeChapter.title}`}>
          {/* <div className="mb-2 flex items-center justify-between px-1">
            <h2 className="truncate text-sm font-medium text-dark/60 dark:text-light/60">
              {activeChapter.title}
            </h2>
            <span className="text-xs text-dark/45 dark:text-light/45">
              Capítulo {activeChapter.order + 1} de {chapters.length}
            </span>
          </div> */}
          <RichTextEditor
            chapterId={activeChapter._id}
            content={activeChapter.content || EMPTY_EDITOR_CONTENT}
            onChange={handleContentChange}
          />
        </section>
      </div>
      <div className="pb-8" />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const ErrorBoundary = () => {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const message = isNotFound
    ? 'La Storativa no existe o no tienes acceso a ella.'
    : 'No pudimos cargar el espacio de edición.';

  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-xl border border-dark/10 bg-primary/10 p-8 text-center dark:border-light/10 dark:bg-primary/5">
        <AlertCircle className="mx-auto text-primary" size={42} />
        <h1 className="mt-4 text-2xl font-semibold text-dark dark:text-light">
          {isNotFound ? 'Storativa no encontrada' : 'Algo salió mal'}
        </h1>
        <p className="mt-2 text-dark/65 dark:text-light/65">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {!isNotFound && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary px-4 py-2 font-medium text-light"
            >
              Reintentar
            </button>
          )}
          <NavLink
            to="/dashboard"
            className="rounded-md border border-dark/15 px-4 py-2 font-medium text-dark dark:border-light/15 dark:text-light"
          >
            Volver al dashboard
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Edition;
