// utils/jitsi.ts
export function generateJitsiLink(): string {
  const roomName = `meeting-${Math.random().toString(36).substring(2, 10)}`;
  return `https://meet.jit.si/${roomName}`;
}
