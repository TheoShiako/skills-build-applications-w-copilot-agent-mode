import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import { User, Team, Activity, LeaderboardEntry, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';
const allowedOrigins = [
  frontendOrigin,
  ...(process.env.FRONTEND_URL?.split(',').map((origin) => origin.trim()).filter(Boolean) || []),
];
const codespacesFrontendOrigin = /^https:\/\/[a-z0-9-]+-5173\.app\.github\.dev$/;

app.use(cors({ origin: [...allowedOrigins, codespacesFrontendOrigin] }));
app.use(express.json());

app.get('/api/health', async (_request, response) => {
  const readyState = db.readyState;
  response.json({ status: 'ok', apiBaseUrl, database: { readyState } });
});

app.get(['/api/users', '/api/users/'], async (_request, response) => {
  const users = await User.find({}).sort({ createdAt: 1 }).lean();
  response.json({ message: 'Users retrieved successfully', data: users, apiBaseUrl });
});

app.get(['/api/teams', '/api/teams/'], async (_request, response) => {
  const teams = await Team.find({}).populate('captainId', 'name').populate('members', 'name email').lean();
  response.json({ message: 'Teams retrieved successfully', data: teams, apiBaseUrl });
});

app.get(['/api/activities', '/api/activities/'], async (_request, response) => {
  const activities = await Activity.find({}).populate('userId', 'name email').sort({ date: -1 }).lean();
  response.json({ message: 'Activities retrieved successfully', data: activities, apiBaseUrl });
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
  response.json({ message: 'Leaderboard retrieved successfully', data: leaderboard, apiBaseUrl });
});

app.get(['/api/workouts', '/api/workouts/'], async (_request, response) => {
  const workouts = await Workout.find({}).sort({ createdAt: 1 }).lean();
  response.json({ message: 'Workouts retrieved successfully', data: workouts, apiBaseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});