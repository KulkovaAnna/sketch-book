import { Container } from './styles';
import { Editor } from 'components';
import HistoryContext, { HistoryStore } from 'stores/HistoryStore';

const historyStore = new HistoryStore();

function App() {
  return (
    <HistoryContext.Provider value={historyStore}>
      <Container>
        <Editor style={{ width: '100%', height: '100%' }} />
      </Container>
    </HistoryContext.Provider>
  );
}

export default App;
