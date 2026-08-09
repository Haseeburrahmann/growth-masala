import { MapPin, UserCheck, FileCheck, Bot, Check, Minus, X } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SectionIntro from "@/components/home/SectionIntro";

/**
 * Differentiation by comparison, not by adjective.
 *
 * The reader is not choosing between us and nothing — they are choosing between
 * us, a Hyderabad agency, a freelancer, a relative who "knows computers", and a
 * DIY site builder. Naming those options directly is more persuasive than a list
 * of qualities we assert about ourselves. Five options, and the headline says so.
 *
 * Every claim here has to be provable. An unprovable differentiator is worse
 * than none, because the first one that turns out to be false discredits the
 * rest.
 *
 * Rebuilt shorter on client instruction — it was the longest section on the
 * page and read as a wall of text. Three things went:
 *
 *   - The photograph. It bled off the left edge of the viewport and the pillars
 *     sat in a slab overlapping its lower corner. The interlock was the most
 *     complicated composition on the site and it forced the heading and the
 *     pillars into `lg:pl-[48%]` / `lg:pl-[22%]` offsets that only made sense at
 *     one width. Removing it takes roughly 660px of height and a 37KB request
 *     out of the section and costs the argument nothing — the photo carried no
 *     claim. (`team-work.webp` is still used on /about, so it is not orphaned.)
 *
 *   - The pillar paragraphs. Four titles with a sentence each restated what the
 *     comparison below already proves; they are now one short line apiece and
 *     read as a strip rather than as four cards competing with the four rows
 *     beneath them.
 *
 *   - The third comparison column. "Instead of us" and "what usually happens"
 *     were separate cells saying one thing between them, which left three
 *     narrow columns of prose. Folded into two, each column gets a readable
 *     measure and the mobile-only duplicate of the first column heading — the
 *     same words printed twice in the markup — is gone with it.
 *
 * Net effect is a section a little under half its previous height with the same
 * argument intact. Keep it that way: this is the page's comparison, not its
 * feature list, and anything added here should replace something.
 *
 * This is the only navy section in the lower half of the page. Process went
 * light in the same pass as the last rebuild, so this one is now doing all of
 * that work alone; keep it dark.
 */
const pillars = [
  {
    icon: MapPin,
    title: "We are actually here",
    body: "A Mahabubnagar address. Telugu, Hindi or English.",
    accent: false,
  },
  {
    icon: UserCheck,
    title: "You get the senior person",
    body: "Whoever quotes it, builds it.",
    accent: false,
  },
  {
    icon: FileCheck,
    title: "Fixed quote, up front",
    body: "Scope and number in writing, before anything starts.",
    accent: false,
  },
  {
    icon: Bot,
    title: "AI nobody else here offers",
    body: "Chatbots, WhatsApp automation, voice agents.",
    accent: true,
  },
];

/**
 * `blocked` marks the alternative that fails outright rather than merely
 * disappointing — a platform you cannot leave is a different kind of problem
 * from a freelancer who goes quiet, and it gets the cross instead of the dash.
 */
const comparisons = [
  {
    option: "A Hyderabad agency",
    usually: "Big retainer. You are a small account.",
    ours: "A direct line to the person building it.",
    blocked: false,
  },
  {
    option: "A freelancer",
    usually: "Goes quiet halfway through.",
    ours: "A registered business you can walk into.",
    blocked: false,
  },
  {
    option: "Someone's nephew",
    usually: "Free. Still unfinished a year later.",
    ours: "A launch date agreed in writing.",
    blocked: false,
  },
  {
    option: "A DIY site builder",
    usually: "Free to start. Then you are stuck on their platform.",
    ours: "Your domain. Your logins. Handed over.",
    blocked: true,
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
      {/* Grid texture + warm bloom. Both decorative, both pointer-transparent. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-1/4 hidden h-130 w-130 rounded-full bg-accent/12 blur-[110px] md:block" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionIntro
          tone="dark"
          eyebrow="Why choose us"
          lead="You have five options."
          trail="We are only one of them."
          standfirst="The honest comparison — including where we are not the answer."
        />

        {/* Four short claims as a strip, not as cards. A hairline above each
            one is enough separation at this length; boxing them would put four
            bordered rectangles directly above four more. */}
        <AnimatedContainer delay={120} className="mt-10 lg:mt-12">
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              /* Icon beside the text until `lg`, above it from there. In one
                 column an icon on its own line costs a whole row of height per
                 pillar for no gain; in a 280px grid cell there is no room for
                 it beside the title. */
              <div
                key={pillar.title}
                className="flex gap-3.5 border-t border-white/12 pt-5 lg:block"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg lg:mb-3.5 ${
                    pillar.accent
                      ? "bg-accent/15 text-accent"
                      : "bg-primary/20 text-secondary"
                  }`}
                >
                  <pillar.icon aria-hidden="true" className="h-4.5 w-4.5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold leading-snug text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400">
                    {pillar.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedContainer>

        {/* The comparison itself. One markup, two shapes. From `md` it is a
            two-column grid with a header strip; below that each row becomes a
            card, the header would be meaningless, and the ✕/✓ marks carry the
            distinction on their own. Not a real <table>: the cells are prose,
            not data, and a screen reader announcing "row 3, column 2" of a
            sales argument helps nobody. */}
        <AnimatedContainer animation="fade-in" delay={160} className="mt-10 lg:mt-14">
          <div className="md:overflow-hidden md:rounded-2xl md:border md:border-white/12 md:bg-navy-light">
            {/* Column headings only exist where there are columns. Separation
                from the first row is a bottom border here rather than a top
                border on the row, so it never has to out-rank `md:border-0`. */}
            <div className="hidden bg-white/4 md:grid md:grid-cols-2 md:border-b md:border-white/8">
              <p className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-slate-400">
                Instead of us, you could use
              </p>
              <p className="bg-primary/15 px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-blue-300">
                With Growth Masala
              </p>
            </div>

            {/* `divide-y` rather than a border on each row: its selector
                out-specifies `md:border-0`, so the card border can be switched
                off at `md` without the row separators going with it. */}
            <div className="flex flex-col gap-3 md:gap-0 md:divide-y md:divide-white/8">
              {comparisons.map((row) => (
                <div
                  key={row.option}
                  className="overflow-hidden rounded-2xl border border-white/12 bg-navy-light md:grid md:grid-cols-2 md:items-stretch md:rounded-none md:border-0"
                >
                  <div className="px-4 pb-3.5 pt-4 sm:px-6 md:py-5">
                    <p className="font-heading text-base font-semibold leading-snug text-white">
                      {row.option}
                    </p>
                    <p className="mt-1.5 flex gap-2.5 text-sm leading-snug text-slate-400">
                      {row.blocked ? (
                        <X aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                      ) : (
                        <Minus aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                      )}
                      {row.usually}
                    </p>
                  </div>

                  {/* Top-aligned, not centred: from `md` this line sits on the
                      same baseline as the option name it answers, so the eye
                      pairs them across the gutter without a rule between. */}
                  <p className="flex gap-2.5 bg-primary/12 px-4 py-3.5 text-sm font-medium leading-snug text-white sm:px-6 md:py-5">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    />
                    {row.ours}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
