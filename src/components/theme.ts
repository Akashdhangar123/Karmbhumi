import type { CSSProperties } from "react";

/**
 * theme.ts — shared design tokens used by every page.
 * Keeps Header, Footer and all pages visually consistent.
 */

export const COLORS = {
  saffron: "#FF9933",
  white: "#FFFFFF",
  green: "#138808",
  chakraBlue: "#0B0B7D",
  textDark: "#1A1A1A",
  textMuted: "#4A4A4A",
  bgLight: "#FAFAF8",
  border: "#E6E6E6",
  tableHeadBg: "#0B0B7D",
};

export const FONT_FAMILY =
  "'Segoe UI', 'Inter', 'Helvetica Neue', Arial, sans-serif";

export const shared: { [key: string]: CSSProperties } = {
  page: {
    fontFamily: FONT_FAMILY,
    backgroundColor: COLORS.white,
    color: COLORS.textDark,
    margin: 0,
    padding: 0,
    lineHeight: 1.7,
  },
  section: {
    padding: "48px 32px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionAlt: {
    padding: "48px 32px",
    backgroundColor: COLORS.bgLight,
  },
  sectionInner: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "26px",
    fontWeight: 700,
    color: COLORS.textDark,
    marginBottom: "8px",
  },
  pageHeroTitle: {
    fontSize: "32px",
    fontWeight: 700,
    color: COLORS.textDark,
    marginBottom: "10px",
    textAlign: "center",
  },
  sectionAccent: {
    width: "64px",
    height: "4px",
    backgroundColor: COLORS.saffron,
    marginBottom: "22px",
  },
  sectionAccentGreen: {
    width: "64px",
    height: "4px",
    backgroundColor: COLORS.green,
    marginBottom: "22px",
  },
  paragraph: {
    fontSize: "15.5px",
    color: COLORS.textMuted,
    marginBottom: "16px",
  },
  reasonList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
    marginTop: "22px",
  },
  reasonCard: {
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderLeft: `4px solid ${COLORS.green}`,
    borderRadius: "6px",
    padding: "20px",
  },
  reasonTitle: {
    fontSize: "15.5px",
    fontWeight: 700,
    color: COLORS.textDark,
    marginBottom: "6px",
  },
  reasonText: {
    fontSize: "14px",
    color: COLORS.textMuted,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "18px",
    marginTop: "24px",
  },
  statCard: {
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderTop: `4px solid ${COLORS.saffron}`,
    borderRadius: "6px",
    padding: "20px 14px",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "24px",
    fontWeight: 700,
    color: COLORS.chakraBlue,
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "13px",
    color: COLORS.textMuted,
    fontWeight: 500,
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    marginTop: "20px",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "6px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "560px",
    fontSize: "14px",
  },
  th: {
    backgroundColor: COLORS.tableHeadBg,
    color: COLORS.white,
    padding: "10px 12px",
    textAlign: "center",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  td: {
    padding: "8px 12px",
    textAlign: "center",
    borderBottom: `1px solid ${COLORS.border}`,
    color: COLORS.textMuted,
  },
  ctaButton: {
    display: "inline-block",
    padding: "13px 30px",
    borderRadius: "6px",
    background: `linear-gradient(to right, ${COLORS.saffron}, ${COLORS.green})`,
    color: COLORS.white,
    fontWeight: 700,
    fontSize: "15px",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  },
  ctaButtonOutline: {
    display: "inline-block",
    padding: "11px 28px",
    borderRadius: "6px",
    background: "transparent",
    color: COLORS.chakraBlue,
    fontWeight: 700,
    fontSize: "15px",
    textDecoration: "none",
    border: `2px solid ${COLORS.chakraBlue}`,
    cursor: "pointer",
  },
};