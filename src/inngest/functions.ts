import { inngest } from "./client";

/**
 * Hello World function - demonstrates basic Inngest function pattern
 * 
 * @remarks
 * This function:
 * - Listens for "test/hello.world" events
 * - Waits 1 second using step.sleep for demonstration
 * - Returns a personalized greeting using event data
 * 
 * Event payload structure:
 * ```ts
 * {
 *   name: "test/hello.world",
 *   data: {
 *     email: string
 *   }
 * }
 * ```
 * 
 * Steps are automatically retried on failure and provide:
 * - Automatic retries with exponential backoff
 * - Observability in the Inngest dashboard
 * - Ability to replay from any step
 * 
 * @example
 * // Trigger this function by sending an event:
 * await inngest.send({
 *   name: "test/hello.world",
 *   data: { email: "user@example.com" }
 * });
 * 
 * @see https://www.inngest.com/docs/functions
 */
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);
