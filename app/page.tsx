import { getConfig, computeTargetTimestamp } from "@/lib/config";
import { HomePage } from "@/components/HomePage";

export const dynamic = "force-dynamic"; // Always fetch fresh config

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const config = await getConfig();
  const search = await searchParams;
  const isDemo = search.demo === 'true';

  if (!config) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <div className="text-center px-6">
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 300,
              marginBottom: "1rem",
            }}
          >
            Something beautiful is coming.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
              color: "var(--text-secondary)",
            }}
          >
            The countdown hasn&apos;t been configured yet.
          </p>
        </div>
      </main>
    );
  }

  const actualTargetTimestamp = computeTargetTimestamp(config);
  // If demo mode is active, set the target timestamp to the past to force completion
  const targetTimestamp = isDemo ? Date.now() - 10000 : actualTargetTimestamp;
  const createdTimestamp = new Date(config.createdAt).getTime();

  return (
    <HomePage
      targetTimestamp={targetTimestamp}
      createdTimestamp={createdTimestamp}
      title={config.title}
      subtitle={config.subtitle}
      youtubeUrl={config.youtubeUrl}
      locationUrl={config.locationUrl}
      completionMessage={config.completionMessage}
    />
  );
}
