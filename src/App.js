// // App.js
// import React, { Suspense } from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import RemoteApp from 'app2/App';
// const FrictionData = React.lazy(() => import('app2/FrictionData'));

// import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement } from "app2/store"; // import actions from remote

// const Home = () => <h2>Welcome to the Host App</h2>;
// const About = () => <h2>About the Host App</h2>;

// const App = () => {
//   const dispatch = useDispatch();
//   const count = useSelector((state) => state.counter.count); // read remote state

//   return (
//     <BrowserRouter>
//       <div style={{
//         margin: "10px",
//         padding: "10px",
//         textAlign: "center",
//         backgroundColor: "greenyellow"
//       }}>
//         <h1>Product Listing</h1>
//         <nav>
//           <Link to="/">Home</Link> |{" "}
//           <Link to="/about">About</Link> |{" "}
//           <Link to="/remote">Remote App</Link>
//         </nav>
//       </div>

// <h2>Remote Counter: {count}</h2>
// <button onClick={() => dispatch(increment())}>Increment</button>
// <button onClick={() => dispatch(decrement())}>Decrement</button>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/remote" element={
//           // <Suspense fallback={<div>Loading Remote App...</div>}>
//             <RemoteApp />
//           // {/* </Suspense> */}
//         } />
//       </Routes>

//       <Suspense fallback={<div>Loading Friction Data...</div>}>
//         <FrictionData />
//       </Suspense>
//     </BrowserRouter>
//   );
// };

// export default App;

// Host App
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from 'app2/store';
import './index.css';

// Lazy-loaded remote components
const RemoteApp = React.lazy(() => import('app2/App'));
// const RemoteApp3 = React.lazy(() => import('app3/App3'));
const FrictionData = React.lazy(() => import('app2/FrictionData'));

const Home = () => <h2>Welcome to the Host App</h2>;
const About = () => <h2>About the Host App</h2>;

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  return (
    <BrowserRouter>
      <div
        style={{
          margin: '10px',
          padding: '10px',
          textAlign: 'center',
          backgroundColor: 'greenyellow',
        }}
      >
        <h1 className='text-red-500'>Product Listing</h1>
        <h2>Remote Counter: {count}</h2>

        <Suspense fallback={<div>Loading Friction Data...</div>}>
          <FrictionData />
        </Suspense>

        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>

        <nav>
          <Link to='/'>Home</Link> | <Link to='/about'>About</Link> |{' '}
          <Link to='/app1'>Remote App</Link> | {/* <Link to="/app3">Remote App3</Link> */}
        </nav>
      </div>

      <Suspense fallback={<div>Loading Remote Module...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/app1/*' element={<RemoteApp />} />
          {/* <Route path="/app3/*" element={<RemoteApp3 />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
