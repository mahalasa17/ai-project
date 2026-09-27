export type CategoryId = 'ALL' | 'AI_ML' | 'CS_FUND' | 'NET_HARD' | 'CLOUD_WEB';

export interface Question {
  id: string;
  category: CategoryId;
  categoryLabel: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  answer: number; // Index of the correct answer
  explanation: string;
}

export interface PreparedQuestion extends Question {
  originalAnswerText: string;
}

export interface RoundResult {
  round: number;
  category: CategoryId;
  categoryLabel: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeSpentSeconds: number;
  timeStr: string;
  missedQuestionIds: string[];
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  completedAt: string;
}

export interface QuizSettings {
  candidateName: string;
  avatarSeed: string;
  topic: CategoryId;
  questionCount: number;
  timerMinutes: number;
}
