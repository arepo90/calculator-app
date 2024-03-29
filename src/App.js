import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings, Scroll } from './components';
import { Calculator, Math, About, Simulator, NotFound } from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

history.listen((location, action) => {
    window.scrollTo(0, 0)
})

const App = () => {
    const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <BrowserRouter>
                <div className="flex relative dark:bg-main-dark-bg">
                    <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                        <TooltipComponent content="Settings" position="TopCenter">
                            <button type="button" className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white" onClick={() => setThemeSettings(true)} style={{ background: currentColor, borderRadius: '50%' }}>
                                <FiSettings />
                            </button>
                        </TooltipComponent>
                    </div>
                    {activeMenu ? (
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                            <Sidebar />
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-bg">
                            <Sidebar />
                        </div>
                    )}
                    <div className={
                        `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
                    }>
                        <div className="sticky top-0 bg-main-bg dark:bg-zinc-900 w-full">
                            <Navbar/>
                        </div>

                        <div>
                            {themeSettings && <ThemeSettings />}
                            <Scroll>
                            <Routes>
                                <Route path="/" element={<Calculator />} />
                                <Route path="/calculator" element={<Calculator />} />
                                <Route path="/math" element={<Math />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/simulator" element={<Simulator />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            </ Scroll>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App