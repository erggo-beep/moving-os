export const SPACING = {
  section: 'space-y-8',
  component: 'mb-8',
  field: 'mb-4',
  fieldSmall: 'mb-2',
  fieldLarge: 'mb-6',
  topSection: 'mt-8',
  topComponent: 'mt-6',
  topField: 'mt-4',
} as const;

export const TYPOGRAPHY = {
  pageTitle: 'text-3xl font-bold text-gray-900',
  sectionTitle: 'text-lg font-bold text-gray-900',
  subsectionTitle: 'text-xl font-bold text-gray-900',
  label: 'text-sm font-semibold text-gray-900',
  body: 'text-gray-600',
  bodySmall: 'text-sm text-gray-600',
} as const;

export const COLORS = {
  primary: 'red-600',
  primaryHover: 'red-700',
  primaryLight: 'red-50',
  primaryBorder: 'red-600',
  border: 'gray-300',
  borderHover: 'gray-400',
  text: 'gray-900',
  textSecondary: 'gray-600',
  textLight: 'gray-500',
  background: 'gray-50',
  backgroundWhite: 'white',
} as const;

export const INPUT_CLASSES = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent' as const;

export const BUTTON_CLASSES = {
  primary: 'px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
  secondary: 'px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
} as const;
