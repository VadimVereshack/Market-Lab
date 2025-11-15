import { Navigation } from './Navigation/Navigation'
// import { UserMenu } from './UserMenu'
// import { Search } from './Search'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* <Logo /> */}
          <Navigation />
          
          {/* <div className="flex items-center gap-4">
            <Search />
            <UserMenu />
          </div> */}
        </div>
      </div>
    </header>
  )
}