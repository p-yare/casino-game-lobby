import React from 'react';
export default function EmptyState({ message }) {
  return <div style={{ textAlign: 'center', padding: '2rem', color: '#fff' }}>{message || 'No games found.'}</div>;
} 