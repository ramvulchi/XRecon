// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}
const ROOTS_DASHBOARD = "";
// ----------------------------------------------------------------------
export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  faqs: "/faqs",
  page403: "/403",
  page404: "/404",
  page500: "/500",
};
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dash: path(ROOTS_DASHBOARD, "/dashboard"),
};
