export const colors = {
  primary: '#10B981', // Emerald Green - Fresh & Islamic friendly
  primaryDark: '#059669',
  secondary: '#F59E0B', // Amber/Gold - Premium accent
  background: '#F9FAFB', // Light Gray - Clean background
  surface: '#FFFFFF',
  text: '#1F2937', // Gray 800
  textLight: '#6B7280', // Gray 500
  border: '#E5E7EB',
  error: '#EF4444',
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 32,
    color: colors.text,
  },
  h2: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 24,
    color: colors.text,
  },
  h3: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 18,
    color: colors.text,
  },
  body: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  caption: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    color: colors.textLight,
  },
  button: {
    fontFamily: 'Inter_18pt-SemiBold',
    fontSize: 16,
    color: colors.surface,
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};
