import { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import {
  ArrowDown,
  ArrowUp,
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
  const { t } = useTranslation('editor');
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
          className="fixed inset-0 top-[calc(var(--nav-height)*1px)] pointer-events-none bg-lightness/20 backdrop-blur-sm duration-300 ease-out data-closed:opacity-0 dark:bg-darkness/20"
        />

        <DialogPanel
          id="edition-chapter-panel"
          transition
          className="fixed inset-0 top-[calc(var(--nav-height)*1px)] pointer-events-auto flex w-full flex-col gap-y-5 overflow-x-hidden overflow-y-auto border-r border-dark/10 bg-lightness px-6 py-10 shadow-2xl duration-300 ease-out data-closed:-translate-x-full dark:border-light/10 dark:bg-darkness sm:w-90"
        >
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center">
              <DialogTitle className="text-lg font-bold text-dark dark:text-light">
                {t('chapters.title')}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-1">
              <CustomButton
                icon={<Plus />}
                onClick={() => void addChapter()}
                disabled={isChapterLocked}
                aria-label={t('chapters.create')}
                title={t('chapters.create')}
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
                        placeholder={t('chapters.placeholder')}
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
                          aria-label={t('chapters.saveName')}
                          width="auto"
                          className="h-fit"
                          size="md"
                        />
                        <CustomButton
                          variant="text"
                          icon={<X />}
                          onClick={() => setRenamingId(null)}
                          aria-label={t('chapters.cancelEdit')}
                          width="auto"
                          className="h-fit text-dark dark:text-light"
                          size="md"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <CustomButton
                        variant="text"
                        onClick={() => void handleSelectChapter(chapter._id)}
                        disabled={isChapterLocked}
                        aria-current={isActive ? 'page' : undefined}
                        className="[&>span]:justify-start [&>span]:text-primary cursor-pointer mb-4 py-2"
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
                          aria-label={t('chapters.moveUp', {
                            title: chapter.title,
                          })}
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
                          aria-label={t('chapters.moveDown', {
                            title: chapter.title,
                          })}
                          size="lg"
                          className="h-fit cursor-pointer text-primary/70"
                        />

                        <CustomButton
                          variant="text"
                          icon={<Pencil />}
                          width="auto"
                          onClick={() => startRename(chapter)}
                          disabled={isChapterLocked}
                          aria-label={t('chapters.rename', {
                            title: chapter.title,
                          })}
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
                          aria-label={t('chapters.delete', {
                            title: chapter.title,
                          })}
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
      </Dialog>

      <CustomDialog
        openDialog={Boolean(deleteCandidate)}
        onCloseDialog={() => setDeleteCandidate(null)}
        initialFocus={cancelDeleteRef}
        title={t('chapters.deleteDialogTitle')}
        subtitle={
          <Trans
            ns="editor"
            i18nKey="chapters.deleteDialogSubtitle"
            values={{ title: deleteCandidate?.title ?? '' }}
            components={{
              strong: (
                <strong className="font-bold text-dark dark:text-light" />
              ),
            }}
          />
        }
        closeLabel={t('chapters.deleteDialogClose')}
      >
        {(closeDialog) => (
          <div className="mt-6 flex gap-6">
            <CustomButton
              ref={cancelDeleteRef}
              onClick={closeDialog}
              variant="outline"
              className="cursor-pointer"
            >
              {t('chapters.cancel')}
            </CustomButton>
            <CustomButton
              variant="danger"
              disabled={isChapterLocked}
              onClick={() => {
                if (!deleteCandidate) return;
                const chapterId = deleteCandidate._id;
                closeDialog();
                void deleteChapter(chapterId);
              }}
              className="cursor-pointer"
            >
              {t('chapters.confirmDelete')}
            </CustomButton>
          </div>
        )}
      </CustomDialog>
    </>
  );
};

export default EditionChapterPanel;
