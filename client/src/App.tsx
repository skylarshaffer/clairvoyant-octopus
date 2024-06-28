import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import { Tool } from './pages/Tool';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Tool />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
