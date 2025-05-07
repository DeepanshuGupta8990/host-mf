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

const Home = () => (
  <h2 className='text-xl font-semibold text-center text-gray-700'>Welcome to the Host App</h2>
);
const About = () => (
  <h2 className='text-xl font-semibold text-center text-gray-700'>About the Host App</h2>
);

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  return (
    <BrowserRouter>
      <div className='max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md'>
        <h1 className='text-3xl text-red-600 font-bold text-center mb-6'>Host App</h1>

        <div className='text-center mb-4'>
          <h2 className='text-lg font-medium mb-2 text-blue-700'>
            Remote Counter: {count} - Store from remote app
          </h2>
          <div className='space-x-4'>
            <button
              onClick={() => dispatch(increment())}
              className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
            >
              Increment
            </button>
            <button
              onClick={() => dispatch(decrement())}
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
            >
              Decrement
            </button>
          </div>
        </div>

        <div className='mb-6'>
          <Suspense fallback={<div className='text-center'>Loading Friction Data...</div>}>
            <FrictionData />
          </Suspense>
        </div>

        <nav className='flex justify-center space-x-6 mb-4 text-blue-600 font-medium'>
          <Link to='/' className='hover:underline'>
            Home
          </Link>
          <Link to='/about' className='hover:underline'>
            About
          </Link>
          <Link to='/app1' className='hover:underline'>
            Remote App
          </Link>
          {/* <Link to="/app3" className="hover:underline">Remote App3</Link> */}
        </nav>

        <Suspense fallback={<div className='text-center'>Loading Remote Module...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/app1/*' element={<RemoteApp baseName={'/app1/page1'} />} />
            {/* <Route path="/app3/*" element={<RemoteApp3 />} /> */}
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
