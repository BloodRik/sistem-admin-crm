import Link from 'next/link'
import StarExplosion from './StarExplosion'

export default function Home() {
	return (
		<main className=''>
			<Link href='/employee'>
				<StarExplosion />
			</Link>
		</main>
	)
}
