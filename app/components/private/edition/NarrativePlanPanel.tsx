import { useEffect, useRef, useState, type FC } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Check, GitBranch, RefreshCw, Save, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useEdition } from '@/context/EditionContext';
import type {
  NarrativeChapterPlan,
  NarrativeCharacterPlan,
  NarrativePlan,
} from '@/interfaces/storativa.interface';
import CustomButton from '@/components/shared/CustomButton';
import CustomTextArea from '@/components/shared/CustomTextArea';

interface NarrativePlanPanelProps {
  open: boolean;
  onClose: () => void;
}

// const inputClassName =
//   'w-full rounded-md border border-primary/20 bg-lightness px-3 py-2 text-sm text-dark outline-none transition focus:border-primary dark:bg-darkness dark:text-light disabled:cursor-default disabled:opacity-75';

const clonePlan = (plan: NarrativePlan): NarrativePlan =>
  JSON.parse(JSON.stringify(plan)) as NarrativePlan;

const NarrativePlanPanel: FC<NarrativePlanPanelProps> = ({ open, onClose }) => {
  const { t } = useTranslation('editor');
  const {
    confirmPlan,
    createManualPlan,
    createPlanRevision,
    isNarrativePlanLoading,
    isNarrativePlanSaving,
    narrativePlan,
    narrativePlanError,
    regeneratePlan,
    saveNarrativePlan,
  } = useEdition();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [draft, setDraft] = useState<NarrativePlan | null>(narrativePlan);

  useEffect(() => {
    setDraft(narrativePlan ? clonePlan(narrativePlan) : null);
  }, [narrativePlan]);

  const isReadOnly = draft?.status === 'confirmed';

  const updatePlanField = <K extends keyof NarrativePlan>(
    field: K,
    value: NarrativePlan[K],
  ) => {
    setDraft((current) => (current ? { ...current, [field]: value } : current));
  };

  const updateChapter = (
    index: number,
    field: keyof NarrativeChapterPlan,
    value: string,
  ) => {
    setDraft((current) => {
      if (!current) return current;
      const chapters = current.chapters.map((chapter, chapterIndex) =>
        chapterIndex === index ? { ...chapter, [field]: value } : chapter,
      );
      return { ...current, chapters };
    });
  };

  const updateCharacter = (
    index: number,
    field: keyof NarrativeCharacterPlan,
    value: string,
  ) => {
    setDraft((current) => {
      if (!current) return current;
      const characters = current.characters.map((character, characterIndex) =>
        characterIndex === index ? { ...character, [field]: value } : character,
      );
      return { ...current, characters };
    });
  };

  const handleSave = async () => {
    if (!draft || isReadOnly) return;
    await saveNarrativePlan(draft);
  };

  const handleConfirm = async () => {
    if (!draft || isReadOnly) return;
    const saved = await saveNarrativePlan(draft);
    if (saved && (await confirmPlan())) onClose();
  };

  const handleCreateRevision = async () => {
    if (!isReadOnly) return;
    await createPlanRevision();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      initialFocus={closeButtonRef}
      className="relative z-60"
    >
      <DialogBackdrop className="fixed inset-0 bg-dark/45 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
        <DialogPanel className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-dark/10 bg-lightness shadow-2xl dark:border-light/10 dark:bg-darkness">
          <div className="flex items-start justify-between gap-4 border-b border-primary/15 px-5 py-4 dark:border-light/10 sm:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {t('plan.title')}
                {draft && ` · ${t(`plan.${draft.status}`)}`}
                {draft &&
                  ` · ${t('plan.revision', { revision: draft.revision })}`}
              </p>
              <DialogTitle className="mt-1 text-xl font-bold text-dark dark:text-light">
                {draft ? t('plan.subtitle') : t('plan.startTitle')}
              </DialogTitle>
            </div>
            <CustomButton
              ref={closeButtonRef}
              icon={<X />}
              onClick={onClose}
              aria-label={t('plan.actions.close')}
              title={t('plan.actions.close')}
              variant="text"
              width="auto"
              className="cursor-pointer text-dark dark:text-light"
            />
          </div>

          <div className="overflow-y-auto px-5 py-6 sm:px-7">
            {isNarrativePlanLoading && (
              <p className="text-sm text-dark/65 dark:text-light/65">
                {t('plan.loading')}
              </p>
            )}

            {!isNarrativePlanLoading && !draft && (
              <div className="mx-auto max-w-2xl py-8 text-center">
                <p className="text-base leading-relaxed text-dark/70 dark:text-light/70">
                  {t('plan.startDescription')}
                </p>
                {narrativePlanError && (
                  <p
                    className="mt-4 text-sm text-red-600 dark:text-red-300"
                    role="alert"
                  >
                    {narrativePlanError}
                  </p>
                )}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <CustomButton
                    icon={<Save />}
                    onClick={() => void createManualPlan()}
                    disabled={isNarrativePlanSaving}
                    className="cursor-pointer"
                  >
                    {t('plan.manual')}
                  </CustomButton>
                  <CustomButton
                    variant="outline"
                    icon={<RefreshCw />}
                    onClick={() => void regeneratePlan()}
                    disabled={isNarrativePlanSaving}
                    className="cursor-pointer"
                  >
                    {t('plan.automatic')}
                  </CustomButton>
                </div>
                <p className="mt-3 text-sm text-dark/55 dark:text-light/55">
                  {t('plan.automaticHint')}
                </p>
              </div>
            )}

            {draft && (
              <>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  {isReadOnly ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm text-dark/65 dark:text-light/65">
                        {t('plan.readOnly')}
                      </p>
                      <CustomButton
                        variant="outline"
                        icon={<GitBranch />}
                        onClick={() => void handleCreateRevision()}
                        disabled={isNarrativePlanSaving}
                        className="cursor-pointer"
                      >
                        {t('plan.actions.createRevision')}
                      </CustomButton>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <CustomButton
                        variant="outline"
                        icon={<RefreshCw />}
                        onClick={() => void regeneratePlan()}
                        disabled={isNarrativePlanSaving}
                        className="cursor-pointer"
                      >
                        {t('plan.actions.regenerate')}
                      </CustomButton>
                      <CustomButton
                        variant="outline"
                        icon={<Save />}
                        onClick={() => void handleSave()}
                        disabled={isNarrativePlanSaving}
                        className="cursor-pointer"
                      >
                        {t('plan.actions.save')}
                      </CustomButton>
                      <CustomButton
                        icon={<Check />}
                        onClick={() => void handleConfirm()}
                        disabled={isNarrativePlanSaving}
                        className="cursor-pointer"
                      >
                        {t('plan.actions.confirm')}
                      </CustomButton>
                    </div>
                  )}
                </div>

                {narrativePlanError && (
                  <p
                    className="mb-5 text-sm text-red-600 dark:text-red-300"
                    role="alert"
                  >
                    {narrativePlanError}
                  </p>
                )}

                <div className="grid gap-5 lg:grid-cols-2">
                  {(
                    [
                      'premise',
                      'theme',
                      'centralConflict',
                      'protagonistGoal',
                      'stakes',
                      'tone',
                    ] as const
                  ).map((field) => (
                    <label
                      key={field}
                      className="text-sm font-semibold text-dark dark:text-light"
                    >
                      {t(`plan.fields.${field}`)}
                      <CustomTextArea
                        value={draft[field]}
                        inputName={t(`plan.fields.${field}`).toLowerCase()}
                        readOnly={isReadOnly}
                        placeholder=""
                        onChange={(event) =>
                          updatePlanField(field, event.target.value)
                        }
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-bold text-dark dark:text-light">
                    {t('plan.characters')}
                  </h3>
                  <div className="space-y-4">
                    {draft.characters.map((character, index) => (
                      <article
                        key={character.characterKey}
                        className="rounded-lg border border-primary/15 p-4 dark:border-light/10"
                      >
                        <h4 className="mb-4 font-bold text-primary">
                          {character.characterKey}
                        </h4>
                        <div className="grid gap-4 lg:grid-cols-3">
                          {(
                            ['motivation', 'internalConflict', 'arc'] as const
                          ).map((field) => (
                            <label
                              key={field}
                              className="text-sm font-semibold text-dark dark:text-light"
                            >
                              {t(`plan.fields.${field}`)}
                              <CustomTextArea
                                inputName={t(
                                  `plan.fields.${field}`,
                                ).toLowerCase()}
                                placeholder=""
                                value={character[field]}
                                readOnly={isReadOnly}
                                onChange={(event) =>
                                  updateCharacter(
                                    index,
                                    field,
                                    event.target.value,
                                  )
                                }
                              />
                            </label>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-bold text-dark dark:text-light">
                    {t('plan.chapters')}
                  </h3>
                  <div className="space-y-5">
                    {draft.chapters.map((chapter, index) => (
                      <article
                        key={chapter.order}
                        className="rounded-lg border border-primary/15 p-4 dark:border-light/10"
                      >
                        <h4 className="mb-4 font-bold text-primary">
                          {chapter.order}.{' '}
                          {chapter.title || t('plan.fields.title')}
                        </h4>
                        <div className="grid gap-4 lg:grid-cols-2">
                          {(
                            [
                              'title',
                              'objective',
                              'summary',
                              'conflict',
                              'turningPoint',
                              'endingHook',
                            ] as const
                          ).map((field) => (
                            <label
                              key={field}
                              className="text-sm font-semibold text-dark dark:text-light"
                            >
                              {t(`plan.fields.${field}`)}
                              <CustomTextArea
                                inputName={t(
                                  `plan.fields.${field}`,
                                ).toLowerCase()}
                                placeholder=""
                                value={chapter[field]}
                                readOnly={isReadOnly}
                                onChange={(event) =>
                                  updateChapter(
                                    index,
                                    field,
                                    event.target.value,
                                  )
                                }
                              />
                            </label>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default NarrativePlanPanel;
