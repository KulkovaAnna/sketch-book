import dynamic from 'next/dynamic';
import React from 'react';

const EditorScreen = dynamic(
  () => import('screens').then((mod) => mod.EditorScreen),
  { ssr: false }
);

function App() {
  return <EditorScreen />;
}

export default App;
