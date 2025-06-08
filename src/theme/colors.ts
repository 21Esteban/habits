export const colors = {
  info: {
    border: '#bfdbfe',
    background: '#eff6ff',
    text: '#1e40af',
    textSecondary: '#1f2937',
  },

  success: {
    border: '#bbf7d0',
    background: '#f0fdf4',
    text: '#166534',
    textSecondary: '#1f2937',
  },

  warning: {
    border: '#fed7aa',
    background: '#fff7ed',
    text: '#ea580c',
    textSecondary: '#1f2937',
  },

  error: {
    border: '#fecaca',
    background: '#fef2f2',
    text: '#dc2626',
    textSecondary: '#1f2937',
  },
} as const;

export type VariantType = keyof typeof colors;
