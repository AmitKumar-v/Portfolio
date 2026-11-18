// Layout used by every section: title on the left, content on the right (stacked on phones)
export default function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-14 border-t border-border py-12">
      <div className="grid gap-6 md:grid-cols-[9rem_1fr]">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
