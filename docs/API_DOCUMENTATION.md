# Streako Backend API Documentation

## Base URL

Use your server base URL and append the paths below.

Example:

```text
http://127.0.0.1:8000/api/
```

## Authentication

Most endpoints require token authentication.

Header:

```text
Authorization: Token <your_token>
```

Public endpoints:

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `GET /api/dashboard/health/`

## Demo Credentials

If you seeded dummy data, these users are available:

- `demo.owner@streako.test` / `DemoPass123!`
- `demo.user@streako.test` / `DemoPass123!`

## Common Date Formats

- `Date`: `YYYY-MM-DD`
- `DateTime`: ISO 8601, example `2026-04-13T10:30:00+05:30`

## Enum Values

### Task Priority

- `low`
- `medium`
- `high`

### Task Status

- `pending`
- `completed`
- `missed`

### Habit Frequency

- `daily`
- `weekly`

### Event Kind

- `meeting`
- `task`
- `event`

### Event Repeat Option

- `none`
- `daily`
- `weekly`
- `custom`

### Reminder Type

- `task`
- `event`

### Reminder Trigger Type

- `instant`
- `custom`
- `three_days_before`
- `one_day_before`
- `same_day`

### Streak Entity Type

- `task`
- `habit`

---

## 1. Auth APIs

### Register

- `POST /api/auth/register/`
- Auth required: No

Request body:

```json
{
  "email": "newuser@example.com",
  "password": "StrongPass123!",
  "first_name": "New",
  "last_name": "User",
  "timezone": "Asia/Kolkata"
}
```

Parameters:

- `email`: string, required, unique
- `password`: string, required, minimum 8 chars
- `first_name`: string, optional
- `last_name`: string, optional
- `timezone`: string, optional

Success response:

```json
{
  "token": "auth_token_here",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "first_name": "New",
    "last_name": "User",
    "timezone": "Asia/Kolkata",
    "is_premium": false,
    "date_joined": "2026-04-13T00:00:00Z"
  }
}
```

### Login

- `POST /api/auth/login/`
- Auth required: No

Request body:

```json
{
  "email": "demo.owner@streako.test",
  "password": "DemoPass123!"
}
```

Parameters:

- `email`: string, required
- `password`: string, required

Success response:

```json
{
  "token": "auth_token_here",
  "user_id": 2
}
```

### Current Profile

- `GET /api/auth/me/`
- Auth required: Yes

Response fields:

- `id`
- `email`
- `first_name`
- `last_name`
- `timezone`
- `is_premium`
- `date_joined`

---

## 2. Task Categories APIs

### List Categories

- `GET /api/tasks/categories/`
- Auth required: Yes

Query params:

- `search`: string, optional, filters by category name

### Create Category

- `POST /api/tasks/categories/`
- Auth required: Yes

Request body:

```json
{
  "name": "Work",
  "color": "#2563EB"
}
```

Parameters:

- `name`: string, required, max 50
- `color`: string, optional, max 10

### Category Detail / Update / Delete

- `GET /api/tasks/categories/{id}/`
- `PUT /api/tasks/categories/{id}/`
- `PATCH /api/tasks/categories/{id}/`
- `DELETE /api/tasks/categories/{id}/`

---

## 3. Task Tags APIs

### List Tags

- `GET /api/tasks/tags/`

Query params:

- `search`: string, optional

### Create Tag

- `POST /api/tasks/tags/`

Request body:

```json
{
  "name": "Business",
  "color": "#F97316"
}
```

Parameters:

- `name`: string, required, max 50
- `color`: string, optional, max 10

### Tag Detail / Update / Delete

- `GET /api/tasks/tags/{id}/`
- `PUT /api/tasks/tags/{id}/`
- `PATCH /api/tasks/tags/{id}/`
- `DELETE /api/tasks/tags/{id}/`

---

## 4. Tasks APIs

### List Tasks

- `GET /api/tasks/`
- Auth required: Yes

Query params:

- `status`: `pending|completed|missed`
- `priority`: `low|medium|high`
- `category`: integer category id
- `tag`: integer tag id
- `date_from`: date string `YYYY-MM-DD`
- `date_to`: date string `YYYY-MM-DD`
- `search`: string, matches title or description
- `ordering`: one of `due_date`, `-due_date`, `priority`, `-priority`, `created_at`, `-created_at`

### Create Task

- `POST /api/tasks/`

Request body:

```json
{
  "category": 1,
  "tags": [1, 2],
  "title": "Prepare investor update",
  "description": "Draft the weekly progress mail and metrics snapshot.",
  "scheduled_at": "2026-04-13T18:30:00+05:30",
  "due_date": "2026-04-16T18:30:00+05:30",
  "priority": "high",
  "status": "pending",
  "is_recurring": false,
  "recurrence_rule": ""
}
```

Parameters:

- `category`: integer, optional, must belong to logged-in user
- `tags`: integer array, optional, every tag must belong to logged-in user
- `title`: string, required, max 255
- `description`: string, optional
- `scheduled_at`: datetime, optional
- `due_date`: datetime, optional
- `priority`: `low|medium|high`, optional, default `medium`
- `status`: `pending|completed|missed`, optional, default `pending`
- `attachment`: file, optional
- `is_recurring`: boolean, optional
- `recurrence_rule`: string, optional, max 64

Read-only response fields:

- `id`
- `completed_at`
- `moved_to_history_at`
- `created_at`
- `updated_at`
- `logs`

### Task Detail / Update / Delete

- `GET /api/tasks/{id}/`
- `PUT /api/tasks/{id}/`
- `PATCH /api/tasks/{id}/`
- `DELETE /api/tasks/{id}/`

### Mark Task Completed

- `POST /api/tasks/{id}/complete/`

Effect:

- sets task status to `completed`
- writes or updates a `TaskLog`
- updates streak cache
- updates daily summary

### Mark Task Missed

- `POST /api/tasks/{id}/miss/`

Effect:

- sets task status to `missed`
- writes or updates a `TaskLog`
- updates streak cache
- updates daily summary

### Task Response Shape

```json
{
  "id": 1,
  "category": 1,
  "tags": [1, 2],
  "title": "Prepare investor update",
  "description": "Draft the weekly progress mail and metrics snapshot.",
  "scheduled_at": "2026-04-13T18:30:00+05:30",
  "due_date": "2026-04-16T18:30:00+05:30",
  "completed_at": null,
  "priority": "high",
  "status": "pending",
  "attachment": null,
  "is_recurring": false,
  "recurrence_rule": "",
  "moved_to_history_at": null,
  "created_at": "2026-04-13T10:00:00Z",
  "updated_at": "2026-04-13T10:00:00Z",
  "logs": [
    {
      "id": 1,
      "date": "2026-04-13",
      "status": "completed",
      "completed_at": "2026-04-13T12:00:00Z"
    }
  ]
}
```

---

## 5. Habits APIs

### List Habits

- `GET /api/habits/`

Query params:

- `is_active`: `true|false`

### Create Habit

- `POST /api/habits/`

Request body:

```json
{
  "name": "Read 20 pages",
  "frequency": "daily",
  "start_date": "2026-04-13",
  "is_active": true
}
```

Parameters:

- `name`: string, required, max 255
- `frequency`: `daily|weekly`, required
- `start_date`: date, required
- `is_active`: boolean, optional, default `true`

### Habit Detail / Update / Delete

- `GET /api/habits/{id}/`
- `PUT /api/habits/{id}/`
- `PATCH /api/habits/{id}/`
- `DELETE /api/habits/{id}/`

### Complete Habit for Today

- `POST /api/habits/{id}/complete-today/`

Effect:

- creates or updates today’s `HabitLog`
- updates streak cache
- updates daily summary

### Habit Response Shape

```json
{
  "id": 1,
  "name": "Read 20 pages",
  "frequency": "daily",
  "start_date": "2026-04-13",
  "is_active": true,
  "created_at": "2026-04-13T10:00:00Z",
  "updated_at": "2026-04-13T10:00:00Z",
  "logs": [
    {
      "id": 1,
      "date": "2026-04-13",
      "status": "completed"
    }
  ]
}
```

---

## 6. Events APIs

### List Events

- `GET /api/events/`

Query params:

- `kind`: `meeting|task|event`
- `date_from`: date string
- `date_to`: date string

### Create Event

- `POST /api/events/`

Request body:

```json
{
  "title": "Client onboarding call",
  "description": "Kickoff discussion with new client.",
  "kind": "meeting",
  "start_time": "2026-04-14T10:00:00+05:30",
  "end_time": "2026-04-14T11:00:00+05:30",
  "repeat_option": "none",
  "recurrence_rule": "",
  "is_recurring": false
}
```

Parameters:

- `title`: string, required, max 255
- `description`: string, optional
- `kind`: `meeting|task|event`, optional, default `event`
- `start_time`: datetime, required
- `end_time`: datetime, required, must be after `start_time`
- `repeat_option`: `none|daily|weekly|custom`, optional, default `none`
- `recurrence_rule`: string, optional, max 64
- `is_recurring`: boolean, optional

### Event Detail / Update / Delete

- `GET /api/events/{id}/`
- `PUT /api/events/{id}/`
- `PATCH /api/events/{id}/`
- `DELETE /api/events/{id}/`

---

## 7. Reminders APIs

### List Reminders

- `GET /api/reminders/`

Query params:

- `reminder_type`: `task|event`
- `is_sent`: `true|false`

### Create Reminder

- `POST /api/reminders/`

Request body for task reminder:

```json
{
  "reminder_type": "task",
  "trigger_type": "custom",
  "task": 1,
  "remind_at": "2026-04-13T17:00:00+05:30",
  "message": "Manual reminder for investor update"
}
```

Request body for event reminder:

```json
{
  "reminder_type": "event",
  "trigger_type": "one_day_before",
  "event": 2,
  "remind_at": "2026-04-13T09:00:00+05:30",
  "message": "Reminder for client onboarding call"
}
```

Parameters:

- `reminder_type`: `task|event`, required
- `trigger_type`: `instant|custom|three_days_before|one_day_before|same_day`, optional, default `custom`
- `task`: integer, required when `reminder_type=task`
- `event`: integer, required when `reminder_type=event`
- `remind_at`: datetime, required
- `message`: string, optional, max 255

Read-only fields:

- `id`
- `is_sent`
- `sent_at`
- `created_at`
- `updated_at`

### Reminder Detail / Update / Delete

- `GET /api/reminders/{id}/`
- `PUT /api/reminders/{id}/`
- `PATCH /api/reminders/{id}/`
- `DELETE /api/reminders/{id}/`

---

## 8. Streak APIs

### List Streaks

- `GET /api/streaks/`

Query params:

- `entity_type`: `task|habit`

### Streak Detail

- `GET /api/streaks/{id}/`

Response fields:

- `id`
- `entity_type`
- `entity_id`
- `current_streak`
- `longest_streak`
- `last_updated`
- `created_at`
- `updated_at`

---

## 9. Dashboard APIs

### Health Check

- `GET /api/dashboard/health/`
- Auth required: No

Response:

```json
{
  "status": "ok",
  "message": "Streako Backend API is running"
}
```

### Dashboard Summary

- `GET /api/dashboard/summary/`
- Auth required: Yes

Response:

```json
{
  "today": {
    "id": 1,
    "date": "2026-04-13",
    "tasks_completed": 2,
    "tasks_missed": 1,
    "pending_tasks": 3,
    "active_streaks": 2,
    "productivity_score": 66.67,
    "created_at": "2026-04-13T10:00:00Z",
    "updated_at": "2026-04-13T10:00:00Z"
  },
  "pending_tasks": 3,
  "completed_tasks_today": 2,
  "active_streaks": 2,
  "weekly_productivity_score": 71.43,
  "recent_summaries": []
}
```

Response fields:

- `today`: nullable daily summary object
- `pending_tasks`: integer
- `completed_tasks_today`: integer
- `active_streaks`: integer
- `weekly_productivity_score`: float
- `recent_summaries`: array of daily summary objects

---

## 10. Dummy Data Seeding

To add repeatable manual-test data:

```bash
./venv/bin/python manage.py seed_dummy_data
```

This seeds:

- demo users
- categories
- tags
- tasks
- task logs
- habits
- habit logs
- events
- reminders
- streak caches
- daily dashboard summaries

---

## 11. Notes

- All authenticated endpoints are user-scoped. You can only access your own data.
- Task creation and event creation automatically generate default reminders when a due/start time exists.
- Completing tasks and habits updates logs, streaks, and dashboard summaries.
- Reminder workers mark due reminders as sent.
- Streak workers recalculate cached streaks and refresh daily summaries.
