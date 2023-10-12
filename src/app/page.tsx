import Header from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section>
          <img src="/assets/man-cooking.png" alt="logo" width="200" height="300" />
        </section>

      </main>
    </>
  )
}
