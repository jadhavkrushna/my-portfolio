import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
import ErrorBoundary from "./components/utils/ErrorBoundary";
import { isWebGLAvailable } from "./components/utils/webglCheck";

const App = () => {
  const webGLAvailable = isWebGLAvailable();

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            {webGLAvailable ? (
              <ErrorBoundary fallback={<div className="character-fallback">WebGL not supported</div>}>
                <Suspense>
                  <CharacterModel />
                </Suspense>
              </ErrorBoundary>
            ) : (
              <div className="character-fallback">3D Model Disabled (No WebGL)</div>
            )}
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
