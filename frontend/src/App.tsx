import Header from './components/Header'
import GoverningThought from './components/GoverningThought'
import SectorTable from './components/SectorTable'
import PetroleumSection from './components/PetroleumSection'
import AutomobilesSection from './components/AutomobilesSection'
import RiceSection from './components/RiceSection'
import SectorComparisonChart from './components/SectorComparisonChart'
import FrameworkMatrix from './components/FrameworkMatrix'
import AfcftaSection from './components/AfcftaSection'
import Implications from './components/Implications'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header />
      <GoverningThought />
      <SectorTable />
      <PetroleumSection />
      <AutomobilesSection />
      <RiceSection />
      <SectorComparisonChart />
      <FrameworkMatrix />
      <AfcftaSection />
      <Implications />
      <Footer />
    </div>
  )
}

export default App
