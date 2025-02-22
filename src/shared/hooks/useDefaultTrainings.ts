import { useEffect, useRef } from 'react';
import useTrainingStore from '@/shared/stores/trainingStore';
import { v4 as uuidv4 } from 'uuid';
import useExerciseStore from '../stores/exerciseStore';

export const useDefaultTrainings = () => {
  const { trainings, addTraining } = useTrainingStore();
  const { exercises, getRandomExercises } = useExerciseStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && trainings.length === 0 && exercises.length > 0) {
      initialized.current = true; 

      const defaultTrainings = [
        {
          title: 'Кардио тренировка',
          filter: { tags: ['кардио'], count: 3 },
          description: 'Набор полезных кардио-упражнений'
        },
        {
          title: 'Тяжелая тренировка',
          filter: { difficulties: ['hard'], count: 3 },
          description: 'Тяжелая тренировка для тех, кто хочет получить вызов'
        },
        {
          title: 'Случайная тренировка',
          filter: { count: 10 },
          description: 'Случайный набор упражнений для любителей неожиданностей'
        }
      ];

      defaultTrainings.forEach(training => {
        const selectedExercises = getRandomExercises(
          training.filter.difficulties || [],
          [],
          training.filter.tags || [],
          training.filter.count
        );

        addTraining({
          title: training.title,
          exercises: selectedExercises.map(ex => ({
            exercise: ex,
            uuid: uuidv4(),
            targetValues: ex.averageValues
          })),
          description: training.description
        });
      });
    }
  }, []); 
};