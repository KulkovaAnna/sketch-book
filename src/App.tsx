import { Container } from './App.styles';
import { Editor } from './components';
import HistoryContext, { HistoryStore } from './stores/HistoryStore';
import ThemeContext, { ThemeStore } from './stores/ThemeStore';

const historyStore = new HistoryStore();
const theme = new ThemeStore();

function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <HistoryContext.Provider value={historyStore}>
        <Container>
          <Editor style={{ width: '100%', height: '100%' }} />
        </Container>
      </HistoryContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
