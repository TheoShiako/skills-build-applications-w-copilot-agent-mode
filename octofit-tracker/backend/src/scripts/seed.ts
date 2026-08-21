import mongoose from 'mongoose';
import { User, Team, Activity, LeaderboardEntry, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ada Stone',
        email: 'ada.stone@octofit.com',
        fitnessLevel: 'intermediate',
        goals: ['Run a 10K', 'Improve mobility', 'Stay consistent'],
        currentStreak: 12,
      },
      {
        name: 'Marco Lee',
        email: 'marco.lee@octofit.com',
        fitnessLevel: 'advanced',
        goals: ['Increase VO2 max', 'Lift 3x per week', 'Recover better'],
        currentStreak: 18,
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@octofit.com',
        fitnessLevel: 'beginner',
        goals: ['Build cardio base', 'Learn strength basics', 'Hit 150 weekly active minutes'],
        currentStreak: 7,
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@octofit.com',
        fitnessLevel: 'advanced',
        goals: ['Train for trail race', 'Maintain form', 'Progressively overload'],
        currentStreak: 15,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Velocity',
        description: 'High-tempo performance team focused on conditioning and speed work.',
        focus: 'HIIT',
        captainId: users[1]._id,
        members: [users[0]._id, users[1]._id, users[3]._id],
        weeklyGoal: '4 speed sessions',
      },
      {
        name: 'Summit',
        description: 'Strength and endurance crew building sustainable power.',
        focus: 'Strength',
        captainId: users[0]._id,
        members: [users[0]._id, users[2]._id, users[3]._id],
        weeklyGoal: '3 lift days and 2 mobility resets',
      },
      {
        name: 'Endurance',
        description: 'Longer-distance athletes balancing aerobic capacity and recovery.',
        focus: 'Cardio',
        captainId: users[2]._id,
        members: [users[1]._id, users[2]._id, users[3]._id],
        weeklyGoal: '5 aerobic sessions',
      },
    ]);

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        durationMinutes: 35,
        caloriesBurned: 420,
        date: new Date('2026-08-15T06:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'strength',
        durationMinutes: 50,
        caloriesBurned: 510,
        date: new Date('2026-08-16T18:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'cycling',
        durationMinutes: 40,
        caloriesBurned: 390,
        date: new Date('2026-08-17T07:15:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'hiit',
        durationMinutes: 28,
        caloriesBurned: 460,
        date: new Date('2026-08-18T17:45:00Z'),
      },
      {
        userId: users[0]._id,
        type: 'mobility',
        durationMinutes: 22,
        caloriesBurned: 140,
        date: new Date('2026-08-19T20:00:00Z'),
      },
    ]);

    const leaderboardEntries = await LeaderboardEntry.insertMany([
      {
        rank: 1,
        userId: users[1]._id,
        userName: 'Marco Lee',
        points: 1280,
        trend: 'up',
      },
      {
        rank: 2,
        userId: users[0]._id,
        userName: 'Ada Stone',
        points: 1185,
        trend: 'steady',
      },
      {
        rank: 3,
        userId: users[3]._id,
        userName: 'Noah Kim',
        points: 1102,
        trend: 'up',
      },
      {
        rank: 4,
        userId: users[2]._id,
        userName: 'Priya Shah',
        points: 1040,
        trend: 'down',
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Power Circuit',
        focusArea: 'Full body',
        difficulty: 'moderate',
        durationMinutes: 30,
        coach: 'Coach Ava',
        equipment: ['Kettlebell', 'Mat', 'Dumbbells'],
        description: 'Explosive strength intervals to improve power and endurance.',
      },
      {
        title: 'Tempo Run',
        focusArea: 'Cardio',
        difficulty: 'challenging',
        durationMinutes: 25,
        coach: 'Coach Leo',
        equipment: ['Running shoes'],
        description: 'Sustained effort intervals for a stronger aerobic engine.',
      },
      {
        title: 'Mobility Reset',
        focusArea: 'Recovery',
        difficulty: 'easy',
        durationMinutes: 20,
        coach: 'Coach Imani',
        equipment: ['Yoga mat'],
        description: 'Gentle mobility flow to reduce tension and improve range of motion.',
      },
      {
        title: 'Leg Day Blast',
        focusArea: 'Lower body',
        difficulty: 'challenging',
        durationMinutes: 45,
        coach: 'Coach Jules',
        equipment: ['Barbell', 'Bench'],
        description: 'Compound lower-body work with a focus on form and strength progression.',
      },
    ]);

    console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, and ${await Workout.countDocuments()} workouts.`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
