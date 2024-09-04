import React from 'react'

function Navbar() {
  return (
    <div className='border-2 border-green-950'>
        <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn text-green-950 btn-ghost text-xl">MINISTRY OF COAL</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="text-green-950 justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a className='text-green-950'>Settings</a></li>
        <li><a className='text-green-950'>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default Navbar