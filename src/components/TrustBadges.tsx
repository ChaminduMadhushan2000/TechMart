export interface TrustBadgesProps {
  badge1Text: string;
  badge2Text: string;
  badge3Text: string;
  badge4Text: string;
}

function TrustBadges(props: TrustBadgesProps): JSX.Element {
  const badges: string[] = [props.badge1Text, props.badge2Text, props.badge3Text, props.badge4Text];

  return (
    <section className="grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-4" aria-label="Trust Badges">
      {badges.map((badge) => (
        <div key={badge} className="flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium">
          {badge}
        </div>
      ))}
    </section>
  );
}

export default TrustBadges;
