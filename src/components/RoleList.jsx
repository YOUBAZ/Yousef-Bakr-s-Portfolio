import PropTypes from "prop-types";
import { formatPeriod } from "../utils/formatPeriod";

/**
 * Compact list of roles: period, title, optional one-line detail.
 * Used for experience, leadership and volunteering on About and CV.
 * `compact` drops the detail and the hairline, for side columns.
 */
const RoleList = ({ eyebrow, roles, compact = false }) => (
  <div className="space-y-4">
    <p className="ybz-eyebrow">{eyebrow}</p>
    <ul className={compact ? "space-y-4" : "space-y-5"}>
      {roles.map((role) => (
        <li
          key={`${role.title}-${role.period}`}
          className={compact ? "" : "border-l border-edge pl-5"}
        >
          <p className="ybz-meta">{formatPeriod(role.period)}</p>
          <p className="mt-1 text-sm font-medium text-bone">{role.title}</p>
          {!compact && role.detail && (
            <p className="ybz-body mt-1">{role.detail}</p>
          )}
        </li>
      ))}
    </ul>
  </div>
);

RoleList.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      period: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      detail: PropTypes.string,
    })
  ).isRequired,
  compact: PropTypes.bool,
};

export default RoleList;
