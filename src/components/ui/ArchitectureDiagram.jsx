import PropTypes from "prop-types";
import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * How a system is put together: clients, the server and what it is
 * responsible for, and the data store. Drawn from the project's own published
 * stack description, never from guesses. Boxes take the inset fill, so they
 * read against whatever card holds them (DESIGN-SYSTEM.md, figure and ground).
 * The server is the one signal element: it is where the decisions live.
 */
const Box = ({ role, name, notes = [], accent = false }) => (
  <div
    className={`ybz-inset flex h-full flex-col gap-1 p-4 ${accent ? "border-t-2 border-t-[var(--ybz-signal)]" : ""}`}
  >
    <p className="ybz-meta">{role}</p>
    <p className="font-medium text-bone">{name}</p>
    {notes.length > 0 && (
      <ul className="mt-2 space-y-1.5 text-sm leading-snug text-slate-body">
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    )}
  </div>
);

Box.propTypes = {
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.string),
  accent: PropTypes.bool,
};

const Link = () => (
  <div
    className="flex items-center justify-center text-muted"
    aria-hidden="true"
  >
    <ArrowRight size={18} strokeWidth={1.75} className="hidden md:block" />
    <ArrowDown size={18} strokeWidth={1.75} className="md:hidden" />
  </div>
);

const ArchitectureDiagram = ({ architecture, title }) => {
  const { clients = [], server, data, runsOn } = architecture;
  return (
    <figure className="space-y-4" aria-label={`${title} architecture`}>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1.4fr_auto_1fr] md:items-stretch">
        <div className="flex flex-col gap-3">
          {clients.map((c) => (
            <Box key={c.name} role="Client" name={c.name} notes={c.notes} />
          ))}
        </div>
        <Link />
        <Box role="Server" name={server.name} notes={server.notes} accent />
        <Link />
        <Box role="Data" name={data.name} notes={data.notes} />
      </div>
      {runsOn && <figcaption className="ybz-source">{runsOn}</figcaption>}
    </figure>
  );
};

const part = PropTypes.shape({
  name: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.string),
});

ArchitectureDiagram.propTypes = {
  architecture: PropTypes.shape({
    clients: PropTypes.arrayOf(part),
    server: part.isRequired,
    data: part.isRequired,
    runsOn: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default ArchitectureDiagram;
