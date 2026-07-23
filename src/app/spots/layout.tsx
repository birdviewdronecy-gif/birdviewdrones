import { SpotsExperience } from "@/components/map/SpotsExperience";

/**
 * Shared shell for /spots and /spots/[slug].
 * Map + cards mount once so selecting a spot does not remount the map.
 */
export default function SpotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SpotsExperience />
      {/* Page slots only handle metadata / notFound validation */}
      {children}
    </>
  );
}
