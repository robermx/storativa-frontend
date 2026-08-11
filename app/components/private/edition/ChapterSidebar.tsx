import { useRef, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Check,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react';

import type { Chapter } from '@/interfaces/storativa.interface';
import { useEdition } from '@/context/EditionContext';

const ChapterSidebar = () => {
  const {
    activeChapterId,
    addChapter,
    chapterError,
    chapters,
    deleteChapter,
    isChapterLocked,
    moveChapter,
    renameChapter,
    selectChapter,
  } = useEdition();
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [titleDraft, setTitleDraft] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<Chapter | null>(null);
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);
  const activeChapter = chapters.find(
    (chapter) => chapter._id === activeChapterId,
  );
  const activeChapterIndex = chapters.findIndex(
    (chapter) => chapter._id === activeChapterId,
  );

  const startRename = (chapter: Chapter) => {
    setRenamingId(chapter._id);
    setTitleDraft(chapter.title);
  };

  const submitRename = async () => {
    if (!renamingId || !titleDraft.trim()) return;
    const wasRenamed = await renameChapter(renamingId, titleDraft.trim());
    if (wasRenamed) setRenamingId(null);
  };

  return (
    <>
      <aside className="rounded-xl border border-dark/10 bg-primary/10 p-4 dark:border-light/10 dark:bg-primary/5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary" size={20} />
            <h2 className="font-semibold text-dark dark:text-light">
              Capítulos
            </h2>
          </div>
          <button
            type="button"
            onClick={() => void addChapter()}
            disabled={isChapterLocked}
            aria-label="Crear capítulo"
            title="Crear capítulo"
            className="rounded-md bg-primary p-2 text-light transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="lg:hidden">
          <label
            htmlFor="active-chapter"
            className="mb-1 block text-xs font-medium text-dark/60 dark:text-light/60"
          >
            Capítulo activo
          </label>
          <select
            id="active-chapter"
            value={activeChapterId}
            disabled={isChapterLocked}
            onChange={(event) => {
              setRenamingId(null);
              void selectChapter(event.target.value);
            }}
            className="w-full rounded-md border border-dark/10 bg-lightness px-3 py-2 text-dark outline-none focus:border-primary dark:border-light/10 dark:bg-darkness dark:text-light"
          >
            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                {chapter.title}
              </option>
            ))}
          </select>
          {activeChapter && renamingId === activeChapter._id ? (
            <div className="mt-2 flex gap-1">
              <input
                autoFocus
                value={titleDraft}
                maxLength={100}
                onChange={(event) => setTitleDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') void submitRename();
                  if (event.key === 'Escape') setRenamingId(null);
                }}
                className="min-w-0 flex-1 rounded-md border border-primary bg-lightness px-2 py-1.5 text-sm text-dark outline-none dark:bg-darkness dark:text-light"
              />
              <button
                type="button"
                onClick={() => void submitRename()}
                disabled={!titleDraft.trim() || isChapterLocked}
                aria-label="Guardar nombre"
                className="rounded p-1.5 text-primary disabled:opacity-40"
              >
                <Check size={18} />
              </button>
              <button
                type="button"
                onClick={() => setRenamingId(null)}
                aria-label="Cancelar edición"
                className="rounded p-1.5 text-dark/50 dark:text-light/50"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="mt-2 flex justify-end gap-1 text-dark/55 dark:text-light/55">
              <button
                type="button"
                onClick={() => void moveChapter(activeChapterId, -1)}
                disabled={isChapterLocked || activeChapterIndex === 0}
                aria-label={`Subir ${activeChapter?.title ?? 'capítulo'}`}
                className="rounded p-1.5 hover:bg-primary/10 hover:text-primary disabled:opacity-25"
              >
                <ArrowUp size={17} />
              </button>
              <button
                type="button"
                onClick={() => void moveChapter(activeChapterId, 1)}
                disabled={
                  isChapterLocked || activeChapterIndex === chapters.length - 1
                }
                aria-label={`Bajar ${activeChapter?.title ?? 'capítulo'}`}
                className="rounded p-1.5 hover:bg-primary/10 hover:text-primary disabled:opacity-25"
              >
                <ArrowDown size={17} />
              </button>
              <button
                type="button"
                onClick={() => activeChapter && startRename(activeChapter)}
                disabled={isChapterLocked || !activeChapter}
                aria-label={`Renombrar ${activeChapter?.title ?? 'capítulo'}`}
                className="rounded p-1.5 hover:bg-primary/10 hover:text-primary disabled:opacity-25"
              >
                <Pencil size={17} />
              </button>
              <button
                type="button"
                onClick={() => setDeleteCandidate(activeChapter ?? null)}
                disabled={
                  isChapterLocked || chapters.length === 1 || !activeChapter
                }
                aria-label={`Eliminar ${activeChapter?.title ?? 'capítulo'}`}
                className="rounded p-1.5 hover:bg-red-500/10 hover:text-red-600 disabled:opacity-25"
              >
                <Trash2 size={17} />
              </button>
            </div>
          )}
        </div>

        <ol className="hidden space-y-2 lg:block">
          {chapters.map((chapter, index) => {
            const isActive = chapter._id === activeChapterId;
            const isRenaming = chapter._id === renamingId;

            return (
              <li
                key={chapter._id}
                className={`rounded-lg border p-2 transition-colors ${
                  isActive
                    ? 'border-primary bg-primary/15'
                    : 'border-transparent hover:border-primary/20 hover:bg-light/50 dark:hover:bg-dark/30'
                }`}
              >
                {isRenaming ? (
                  <div className="flex gap-1">
                    <input
                      autoFocus
                      value={titleDraft}
                      maxLength={100}
                      onChange={(event) => setTitleDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') void submitRename();
                        if (event.key === 'Escape') setRenamingId(null);
                      }}
                      className="min-w-0 flex-1 rounded-md border border-primary bg-lightness px-2 py-1 text-sm text-dark outline-none dark:bg-darkness dark:text-light"
                    />
                    <button
                      type="button"
                      onClick={() => void submitRename()}
                      disabled={!titleDraft.trim() || isChapterLocked}
                      aria-label="Guardar nombre"
                      className="rounded p-1 text-primary disabled:opacity-40"
                    >
                      <Check size={17} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setRenamingId(null)}
                      aria-label="Cancelar edición"
                      className="rounded p-1 text-dark/50 dark:text-light/50"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setRenamingId(null);
                        void selectChapter(chapter._id);
                      }}
                      disabled={isChapterLocked}
                      aria-current={isActive ? 'page' : undefined}
                      className="w-full truncate px-1 py-1 text-left text-sm font-medium text-dark disabled:cursor-not-allowed dark:text-light"
                    >
                      {chapter.title}
                    </button>
                    <div className="mt-1 flex justify-end gap-0.5 text-dark/50 dark:text-light/50">
                      <button
                        type="button"
                        onClick={() => void moveChapter(chapter._id, -1)}
                        disabled={isChapterLocked || index === 0}
                        aria-label={`Subir ${chapter.title}`}
                        className="rounded p-1 hover:bg-primary/10 hover:text-primary disabled:opacity-25"
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => void moveChapter(chapter._id, 1)}
                        disabled={
                          isChapterLocked || index === chapters.length - 1
                        }
                        aria-label={`Bajar ${chapter.title}`}
                        className="rounded p-1 hover:bg-primary/10 hover:text-primary disabled:opacity-25"
                      >
                        <ArrowDown size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => startRename(chapter)}
                        disabled={isChapterLocked}
                        aria-label={`Renombrar ${chapter.title}`}
                        className="rounded p-1 hover:bg-primary/10 hover:text-primary disabled:opacity-25"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteCandidate(chapter)}
                        disabled={isChapterLocked || chapters.length === 1}
                        aria-label={`Eliminar ${chapter.title}`}
                        className="rounded p-1 hover:bg-red-500/10 hover:text-red-600 disabled:opacity-25"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ol>

        {chapterError && (
          <p
            role="alert"
            className="mt-4 text-sm text-red-600 dark:text-red-300"
          >
            {chapterError}
          </p>
        )}
      </aside>

      <Dialog
        open={Boolean(deleteCandidate)}
        onClose={() => setDeleteCandidate(null)}
        initialFocus={cancelDeleteRef}
        className="relative z-60"
      >
        <div
          className="fixed inset-0 bg-dark/45 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl border border-dark/10 bg-lightness p-6 shadow-2xl dark:border-light/10 dark:bg-darkness">
            <DialogTitle className="text-xl font-semibold text-dark dark:text-light">
              Eliminar capítulo
            </DialogTitle>
            <p className="mt-2 text-sm text-dark/65 dark:text-light/65">
              Se eliminará “{deleteCandidate?.title}” y su contenido. Esta
              acción no se puede deshacer.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                ref={cancelDeleteRef}
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="rounded-md border border-dark/15 px-4 py-2 text-sm font-medium text-dark dark:border-light/15 dark:text-light"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isChapterLocked}
                onClick={() => {
                  if (!deleteCandidate) return;
                  const chapterId = deleteCandidate._id;
                  setDeleteCandidate(null);
                  void deleteChapter(chapterId);
                }}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                Eliminar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ChapterSidebar;
