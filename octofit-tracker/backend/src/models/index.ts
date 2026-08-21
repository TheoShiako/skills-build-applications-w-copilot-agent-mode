import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    goals: [{ type: String }],
    currentStreak: { type: Number, default: 0 },
    profilePhoto: { type: String, default: '' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    focus: { type: String, required: true },
    captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    weeklyGoal: { type: String, default: '4 training sessions' },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycling', 'strength', 'swim', 'hiit', 'mobility'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true, min: 1 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
    trend: { type: String, enum: ['up', 'down', 'steady'], default: 'steady' },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: 'leaderboard' },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'moderate', 'challenging'], default: 'moderate' },
    durationMinutes: { type: Number, required: true, min: 10 },
    coach: { type: String, default: 'OctoFit Coaching' },
    equipment: [{ type: String }],
    description: { type: String, default: '' },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema, 'users');
export const Team = mongoose.model('Team', teamSchema, 'teams');
export const Activity = mongoose.model('Activity', activitySchema, 'activities');
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema, 'leaderboard');
export const Workout = mongoose.model('Workout', workoutSchema, 'workouts');
