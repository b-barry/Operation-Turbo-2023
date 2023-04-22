import { For, Show, useStore } from '@builder.io/mitosis';
import { useRouterPath } from './router';
import LinkAnchor from './link.lite';
import Icon from './icon.lite';
import CldImage from './cld-image.lite';
import Link from 'next/link';
import Logo from '@/components/logo';
import React from 'react';

type NavLinkLite = {
  name: string;
  path: string;
};

type Props = {
  nodes: NavLinkLite[];
};

export default function HeaderLite(props: Props) {
  const state = useStore({
    open: false,
    toggleOpen() {
      state.open = !state.open;
    },
    get navItems() {
      return props.nodes.filter((node) => node.path !== '/');
    },
    get path() {
      return useRouterPath();
    },

    activeClass(p) {
      return `uppercase font-black text-lg ${
        state.path === p ? 'underline' : 'no-underline'
      }`;
    },
  });

  return (
    <header className="fixed w-full top-0 bg-[#091A32] bg-opacity-70 z-20">
      <div className="mx-auto relative flex h-20 max-w-7xl items-center justify-start px-8 xl:px-0">
        <button
          className="relative h-12 w-12 bg-white md:hidden"
          onClick={() => state.toggleOpen()}
        >
          <span className="sr-only">Open main menu</span>
          <div className="absolute left-1/2 top-1/2 block w-6 -translate-x-1/2 -translate-y-1/2 transform">
            <span
              className={`absolute block h-0.5 w-6 transform bg-black transition duration-500 ease-in-out ${
                state.open ? 'rotate-45' : '-translate-y-1.5'
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 w-6 transform bg-black transition duration-500 ease-in-out ${
                state.open ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 w-6 transform bg-black transition duration-500 ease-in-out ${
                state.open ? '-rotate-45' : 'translate-y-1.5'
              }`}
            ></span>
          </div>
        </button>

        <ul
          className={`items-center md:space-x-6 text-sm md:flex  ${
            state.open
              ? 'absolute top-20 left-0 flex w-full flex-col bg-black p-4'
              : 'hidden'
          }`}
        >
          <li
            key="home"
            className={state.open ? 'py-4 text-xl' : 'p-auto text-sm'}
          >
            <LinkAnchor
              title="home"
              href="/"
              className={`uppercase font-black text-lg ${
                state.path === '/' ? `underline` : `no-underline`
              }`}
            >
              HOME
            </LinkAnchor>
          </li>
          <For each={state.navItems}>
            {(node) => (
              <li
                key={node.name}
                className={state.open ? 'py-4 text-xl' : 'p-auto text-sm'}
              >
                <Show
                  when={node.path === '/presskit'}
                  else={
                    <LinkAnchor
                      title={node.name}
                      href={node.path}
                      className={state.activeClass(node.path)}
                    >
                      {node.name}
                    </LinkAnchor>
                  }
                >
                  <a
                    title={node.name}
                    href={node.path}
                    className="uppercase font-black text-lg no-underline"
                  >
                    {node.name}
                  </a>
                </Show>
              </li>
            )}
          </For>
        </ul>
        <div className="absolute right-8 top-2 w-[70px] h-[70px]">
          <Logo />
        </div>
        {/* <Image
          src="/logo.svg"
          alt="Tim Benniks"
          className=""
          width={100}
          height={100}
          loading="eager"
        /> */}
      </div>
    </header>
  );
}
