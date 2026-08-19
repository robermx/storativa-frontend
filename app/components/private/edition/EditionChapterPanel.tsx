import { useRef, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import {
  ArrowDown,
  ArrowUp,
  // BookOpen,
  Check,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react';

import { useEdition } from '@/context/EditionContext';
import type { Chapter } from '@/interfaces/storativa.interface';
import { InputEnumType } from '@/interfaces/input.interface';
import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import CustomButton from '@/components/shared/CustomButton';
import CustomInput from '@/components/shared/CustomInput';
import CustomDialog from '@/components/shared/CustomDialog';

const EditionChapterPanel = () => {
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
  const isChapterPanelOpen = useOverlayPanelStore(
    (state) => state.activePanel === 'edition-chapters',
  );
  const closePanel = useOverlayPanelStore((state) => state.closePanel);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [titleDraft, setTitleDraft] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<Chapter | null>(null);
  const closePanelRef = useRef<HTMLButtonElement>(null);
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);

  const startRename = (chapter: Chapter) => {
    setRenamingId(chapter._id);
    setTitleDraft(chapter.title);
  };

  const submitRename = async () => {
    if (!renamingId || !titleDraft.trim()) return;
    const wasRenamed = await renameChapter(renamingId, titleDraft.trim());
    if (wasRenamed) setRenamingId(null);
  };

  const handleSelectChapter = async (chapterId: string) => {
    setRenamingId(null);
    const wasSelected = await selectChapter(chapterId);
    if (wasSelected) closePanel();
  };

  return (
    <>
      <Dialog
        open={isChapterPanelOpen}
        onClose={closePanel}
        initialFocus={closePanelRef}
        className="relative z-40"
      >
        <DialogBackdrop
          transition
          className="fixed inset-x-0 bottom-0 top-(--nav-height) bg-lightness/20 backdrop-blur-sm duration-300 ease-out data-closed:opacity-0 dark:bg-darkness/20"
        />
        <div className="fixed inset-x-0 bottom-0 top-(--nav-height) pointer-events-none">
          <DialogPanel
            id="edition-chapter-panel"
            transition
            className="pointer-events-auto flex h-full w-full flex-col overflow-x-hidden overflow-y-auto border-r border-dark/10 bg-lightness px-5 py-6 shadow-2xl duration-300 ease-out data-closed:-translate-x-full dark:border-light/10 dark:bg-darkness sm:w-90"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center">
                {/* <BookOpen className="text-primary" size={20} /> */}
                <DialogTitle className="text-lg font-bold text-dark dark:text-light">
                  Capítulos
                </DialogTitle>
              </div>
              <div className="flex items-center gap-1">
                <CustomButton
                  icon={<Plus />}
                  onClick={() => void addChapter()}
                  disabled={isChapterLocked}
                  aria-label="Crear capítulo"
                  title="Crear capítulo"
                  className="cursor-pointer"
                />
              </div>
            </div>

            <ol className="space-y-2">
              {chapters.map((chapter, index) => {
                const isActive = chapter._id === activeChapterId;
                const isRenaming = chapter._id === renamingId;

                return (
                  <li
                    key={chapter._id}
                    className={`rounded-lg border p-3 transition-colors ${
                      isActive
                        ? 'border-primary bg-primary/15'
                        : 'border-transparent hover:border-primary/20 hover:bg-primary/5'
                    }`}
                  >
                    {isRenaming ? (
                      <div className="flex flex-col gap-3">
                        <CustomInput
                          inputType={InputEnumType.chapter}
                          inputName={`chapter-${chapter._id}`}
                          placeholder="Capítulo"
                          value={titleDraft}
                          onChange={(e) => setTitleDraft(e.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') void submitRename();
                            if (event.key === 'Escape') setRenamingId(null);
                          }}
                          maxLength={100}
                        />
                        <div className="flex justify-end gap-3">
                          <CustomButton
                            variant="text"
                            icon={<Check />}
                            onClick={() => void submitRename()}
                            disabled={!titleDraft.trim() || isChapterLocked}
                            aria-label="Guardar nombre"
                            width="auto"
                            className="h-fit"
                            size="md"
                          />
                          <CustomButton
                            variant="text"
                            icon={<X />}
                            onClick={() => setRenamingId(null)}
                            aria-label="Cancelar edición"
                            width="auto"
                            className="h-fit text-dark dark:text-light"
                            size="md"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <CustomButton
                          variant="ghost"
                          onClick={() => void handleSelectChapter(chapter._id)}
                          disabled={isChapterLocked}
                          aria-current={isActive ? 'page' : undefined}
                          className="[&>span]:justify-start [&>span]:text-primary cursor-pointer mb-4"
                          truncate
                        >
                          {chapter.title}
                        </CustomButton>
                        <div className="flex justify-end gap-4">
                          <CustomButton
                            variant="text"
                            icon={<ArrowUp />}
                            width="auto"
                            onClick={() => void moveChapter(chapter._id, -1)}
                            disabled={isChapterLocked || index === 0}
                            aria-label={`Subir ${chapter.title}`}
                            size="lg"
                            className="h-fit cursor-pointer text-primary/70"
                          />

                          <CustomButton
                            variant="text"
                            icon={<ArrowDown />}
                            width="auto"
                            onClick={() => void moveChapter(chapter._id, 1)}
                            disabled={
                              isChapterLocked || index === chapters.length - 1
                            }
                            aria-label={`Bajar ${chapter.title}`}
                            size="lg"
                            className="h-fit cursor-pointer text-primary/70"
                          />

                          <CustomButton
                            variant="text"
                            icon={<Pencil />}
                            width="auto"
                            onClick={() => startRename(chapter)}
                            disabled={isChapterLocked}
                            aria-label={`Renombrar ${chapter.title}`}
                            size="sm"
                            className="h-fit cursor-pointer text-secondary"
                          />

                          <CustomButton
                            variant="text"
                            icon={<Trash2 />}
                            width="auto"
                            type="button"
                            onClick={() => setDeleteCandidate(chapter)}
                            disabled={isChapterLocked || chapters.length === 1}
                            aria-label={`Eliminar ${chapter.title}`}
                            size="sm"
                            className="h-fit cursor-pointer text-red-700/70"
                          />
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
          </DialogPanel>
        </div>
      </Dialog>

      <CustomDialog
        openDialog={Boolean(deleteCandidate)}
        onCloseDialog={() => setDeleteCandidate(null)}
        initialFocus={cancelDeleteRef}
        title="Eliminar Capítulo"
        subtitle={`Se eliminará "${deleteCandidate?.title}" y su contenido. Esta acción no se puede deshacer`}
        closeLabel="cerrar diálogo eliminar capítulo"
      >
        <div className="mt-6 flex justify-end gap-6">
          <CustomButton
            ref={cancelDeleteRef}
            onClick={() => setDeleteCandidate(null)}
            variant="outline"
            className="cursor-pointer"
          >
            Cancelar
          </CustomButton>
          <CustomButton
            variant="danger"
            disabled={isChapterLocked}
            onClick={() => {
              if (!deleteCandidate) return;
              const chapterId = deleteCandidate._id;
              setDeleteCandidate(null);
              void deleteChapter(chapterId);
            }}
            className="cursor-pointer"
          >
            Eliminar
          </CustomButton>
        </div>
      </CustomDialog>
    </>
  );
};

export default EditionChapterPanel;
