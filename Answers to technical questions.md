### How long did you spend on the coding test?
   I have spent approximately 2 days on coding test. This time included setting up the environment, writing the code,
   testing the application, and finalizing the project for submission
   
### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how
### you've used it.
  In My code, the most useful feature from the latest version is optional chaining (?.). This feature allows you to safely access deeply nested 
  properties of objects without needing to manually check for null or undefined at each level.
  // Before (without optional chaining):
   const dueDate = task && task.dueDate ? task.dueDate : 'No due date';
   
  // After (with optional chaining):
   const dueDate = task?.dueDate || 'No due date';

### How would you track down a performance issue in production? Have you ever had to do this?
   - Use Logging: I would start by reviewing application logs. This gives the idea of potential failure of the project
   - Error Tracking: Use error tracking tools to check all error are handled
   - Database Profiling: If the issue is related to database i would we can use databse profiling tools
  While I haven't worked in a professional company setting, I have tackled performance issues in my personal projects.
  To resolve issues, I use logging extensively to trace code execution and identify bottlenecks or errors.
  This hands-on approach has provided me with practical insights into debugging and optimization

### If you had more time, what additional features or improvements would you consider adding to the task management application?
  If given more time, I would consider implementing the following features and improvements:
  - User Authentication and Role Management: Add user roles, such as "Admin" and "User," to allow for permissions-based access to certain tasks.
  - Real-time Updates: Use WebSockets to provide real-time updates for task statuses, ensuring that multiple users see changes instantaneously.
  - Enhanced Filtering and Sorting Options: Allow users to filter tasks by date range, assignees, or category, and offer multi-criteria sorting.
  - Calendar Integration: Integrate a calendar view so that users can see upcoming tasks in a calendar format, making deadlines and due dates more visual.

   
