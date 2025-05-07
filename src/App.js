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
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RemoteApp from 'app2/App'; // Make sure this is properly imported
const FrictionData = React.lazy(() => import('app2/FrictionData'));
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from 'app2/store'; // import actions from remote

const Home = () => <h2>Welcome to the Host App</h2>;
const About = () => <h2>About the Host App</h2>;

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count); // read remote state
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
        <h1>Product Listing</h1>
        <h2>Remote Counter: {count}</h2>
        <FrictionData />
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <nav>
          <Link to='/'>Home</Link> | <Link to='/about'>About</Link> |{' '}
          <Link to='/app1'>Remote App</Link>
        </nav>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/app1/*' element={<RemoteApp />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
