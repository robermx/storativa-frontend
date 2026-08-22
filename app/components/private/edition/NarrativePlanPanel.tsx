import { useEffect, useState, type FC } from 'react';
import { Check, RefreshCw, Save } from 'lucide-react';

import { useEdition } from '@/context/EditionContext';
import type {
  NarrativeChapterPlan,
  NarrativePlan,
} from '@/interfaces/storativa.interface';
import CustomButton from '@/components/shared/CustomButton';

const inputClassName =
  'w-full rounded-md border border-primary/20 bg-lightness px-3 py-2 text-sm text-dark outline-none transition focus:border-primary dark:bg-darkness dark:text-light';

const clonePlan = (plan: NarrativePlan): NarrativePlan =>
  JSON.parse(JSON.stringify(plan)) as NarrativePlan;

const NarrativePlanPanel: FC = () => {
  const {
    confirmPlan,
    isNarrativePlanLoading,
    isNarrativePlanSaving,
    narrativePlan,
    narrativePlanError,
    regeneratePlan,
    saveNarrativePlan,
  } = useEdition();
  const [draft, setDraft] = useState<NarrativePlan | null>(narrativePlan);

  useEffect(() => {
    setDraft(narrativePlan ? clonePlan(narrativePlan) : null);
  }, [narrativePlan]);

  if (isNarrativePlanLoading) {
    return (
      <section className="border-b border-primary/15 px-6 py-6">
        <p className="text-sm text-dark/65 dark:text-light/65">
          Preparando el plan narrativo...
        </p>
      </section>
    );
  }

  if (!draft) {
    return (
      <section className="border-b border-primary/15 px-6 py-6">
        <p className="mb-3 text-sm text-red-600 dark:text-red-300">
          {narrativePlanError || 'No hay un plan narrativo disponible.'}
        </p>
        <CustomButton
          icon={<RefreshCw />}
          onClick={() => void regeneratePlan()}
          disabled={isNarrativePlanSaving}
        >
          Generar plan
        </CustomButton>
      </section>
    );
  }

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

  const handleSave = async () => {
    if (!draft) return;
    await saveNarrativePlan(draft);
  };

  const handleConfirm = async () => {
    if (!draft) return;
    const saved = await saveNarrativePlan(draft);
    if (saved) await confirmPlan();
  };

  return (
    <section className="border-b border-primary/15 px-6 py-7 dark:border-light/10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Brief narrativo ·{' '}
              {draft.status === 'confirmed' ? 'confirmado' : 'borrador'}
            </p>
            <h2 className="mt-1 text-xl font-bold text-dark dark:text-light">
              Revisa la dirección de tu historia
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {/** TODO: CustomDialog para no perder cambios */}
            <CustomButton
              variant="outline"
              icon={<RefreshCw />}
              onClick={() => void regeneratePlan()}
              disabled={isNarrativePlanSaving}
            >
              Regenerar
            </CustomButton>
            <CustomButton
              variant="outline"
              icon={<Save />}
              onClick={() => void handleSave()}
              disabled={isNarrativePlanSaving}
            >
              Guardar borrador
            </CustomButton>
            <CustomButton
              icon={<Check />}
              onClick={() => void handleConfirm()}
              disabled={isNarrativePlanSaving || draft.status === 'confirmed'}
            >
              Confirmar plan
            </CustomButton>
          </div>
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
          <label className="text-sm font-semibold text-dark dark:text-light">
            Premisa
            <textarea
              className={`${inputClassName} mt-2 min-h-24`}
              value={draft.premise}
              onChange={(event) =>
                updatePlanField('premise', event.target.value)
              }
            />
          </label>
          <label className="text-sm font-semibold text-dark dark:text-light">
            Tema
            <textarea
              className={`${inputClassName} mt-2 min-h-24`}
              value={draft.theme}
              onChange={(event) => updatePlanField('theme', event.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-dark dark:text-light">
            Conflicto central
            <textarea
              className={`${inputClassName} mt-2 min-h-24`}
              value={draft.centralConflict}
              onChange={(event) =>
                updatePlanField('centralConflict', event.target.value)
              }
            />
          </label>
          <label className="text-sm font-semibold text-dark dark:text-light">
            Objetivo del protagonista
            <textarea
              className={`${inputClassName} mt-2 min-h-24`}
              value={draft.protagonistGoal}
              onChange={(event) =>
                updatePlanField('protagonistGoal', event.target.value)
              }
            />
          </label>
          <label className="text-sm font-semibold text-dark dark:text-light">
            Apuestas narrativas
            <textarea
              className={`${inputClassName} mt-2 min-h-24`}
              value={draft.stakes}
              onChange={(event) =>
                updatePlanField('stakes', event.target.value)
              }
            />
          </label>
          <label className="text-sm font-semibold text-dark dark:text-light">
            Tono
            <textarea
              className={`${inputClassName} mt-2 min-h-24`}
              value={draft.tone}
              onChange={(event) => updatePlanField('tone', event.target.value)}
            />
          </label>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-bold text-dark dark:text-light">
            Escaleta de capítulos
          </h3>
          <div className="space-y-5">
            {draft.chapters.map((chapter, index) => (
              <article
                key={chapter.order}
                className="rounded-lg border border-primary/15 p-4 dark:border-light/10"
              >
                <h4 className="mb-4 font-bold text-primary">
                  {chapter.order}. {chapter.title}
                </h4>
                <div className="grid gap-4 lg:grid-cols-2">
                  {(
                    [
                      ['title', 'Título'],
                      ['objective', 'Objetivo'],
                      ['summary', 'Resumen'],
                      ['conflict', 'Conflicto'],
                      ['turningPoint', 'Punto de giro'],
                      ['endingHook', 'Gancho final'],
                    ] as const
                  ).map(([field, label]) => (
                    <label
                      key={field}
                      className="text-sm font-semibold text-dark dark:text-light"
                    >
                      {label}
                      <textarea
                        className={`${inputClassName} mt-2 min-h-20`}
                        value={chapter[field]}
                        onChange={(event) =>
                          updateChapter(index, field, event.target.value)
                        }
                      />
                    </label>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NarrativePlanPanel;
