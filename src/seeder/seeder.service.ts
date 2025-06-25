import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../news/entities/news.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}

  async seed() {
    const count = await this.newsRepo.count();
    if (count > 0) return;
    const initial: Partial<News>[] = [
      {
        title: 'Rupee set to rally as crude dives on Israel-Iran de-escalation',
        body: `A man counts money after withdrawing it from an ATM in New Delhi, India. The Indian rupee is poised to climb at open as the plunge in crude oil prices, driven by easing tensions between Israel and Iran, improves outlook for trade balances and assets.

Brent crude fell around 2%, trading below $70 a barrel, the lowest since before the conflict escalation. Experts believe further Federal Reserve rate cuts could weaken the dollar and boost the rupee even more.`,
        image_url:
          'https://www.reuters.com/resizer/v2/PQETQEFSERJWDI5WENYIS5RR5Q.jpg?auth=0ae90005be8a965b7f999cc6ae0f38b5e2abc279c85ba6b498a5b0f779c52b80&quality=80&width=5284',
        author: 'Reuters',
        date: new Date('2025-06-24T02:57:00Z'),
      },
      {
        title:
          'Gold falls 2% as Iran-Israel ceasefire weighs on safe-haven appeal',
        body: `A gold bullion is displayed in a vault in Singapore. Gold fell 2%, hitting a two-week low, as a ceasefire between Iran and Israel reduced demand for safe-haven assets.

Spot gold dropped to $3,319.96 an ounce, while U.S. futures settled lower. Analysts warn that while short-term corrections are possible, long-term support remains around $3,300 per ounce.`,
        image_url:
          'https://www.reuters.com/resizer/v2/U3W4FDYWNVO5RF3J4Y4IJGVR5M.jpg?auth=e516acf6782468afda5483897a75b84ef84c317b179ea33a2b90c46b23c39e3e&quality=80&width=3523',
        author: 'Sarah Qureshi',
        date: new Date('2025-06-24T18:18:00Z'),
      },
      {
        title:
          "Club-wielding Kenyans vow to 'protect' Nairobi as protest marks deadly anniversary",
        body: `Swaleh Aroko, a pro-government counter-protester, moves through downtown Nairobi armed with a wooden club. Amid protests over a teacher's death in custody, dozens have taken to the streets to defend property.

Counter-protesters say they are patriots protecting businesses, while rights groups decry the militia-style activity. With more demonstrations planned, tensions in the capital remain high.`,
        image_url:
          'https://www.reuters.com/resizer/v2/XUDGAOR32BPEJIDQ7WSYVN662Q.jpg?auth=5b54e047622d270df8b8f3206507d66f2e0fe5d770daffb6c3594ed287e02cc2&quality=80&width=1080',
        author: 'Aaron Ross',
        date: new Date('2025-06-24T15:23:00Z'),
      },
      {
        title:
          "US airstrikes failed to destroy Iran's nuclear sites, sources say",
        body: `Satellite imagery shows a crater at the Natanz enrichment facility after U.S. airstrikes. Intelligence reports indicate the strikes only set back Iran's nuclear programme by a few months, falling short of claims to obliterate it.

White House and Israeli officials dispute the assessment, underscoring ongoing uncertainty about the long-term impact of the campaign.`,
        image_url:
          'https://www.reuters.com/resizer/v2/JMT7HIVKHJN47O7QIR35KJ6M2Q.jpg?auth=bdd9220cbdb1259ce094ab7cf14f5d7146e9aff3d611e217aa15042d6972c7fd&quality=80&width=1080',
        author: 'Gram Slattery, Alexander Cornwell and Parisa Hafezi',
        date: new Date('2025-06-24T21:16:00Z'),
      },
      {
        title:
          'US cities face record high temperatures on worst day of heat wave',
        body: `A woman shields herself with an umbrella at the World War II Memorial in Washington amid record heat. The Northeast saw temperatures surpass 101°F, breaking long-standing records.

Services from Amtrak to the National Park Service adapted operations to protect public safety. Residents endured the heat to vote in primary elections, illustrating the extreme conditions.`,
        image_url:
          'https://www.reuters.com/resizer/v2/MDKJLSSZBFK3NJT5KPQXTL2PAQ.jpg?auth=c33ad926e5c302c323878c91292e1e4de8c914714e8aad55d63a2fcd2777a5fc&quality=80&width=1080',
        author: 'Patrick Wingrove',
        date: new Date('2025-06-24T20:50:00Z'),
      },
      {
        title:
          'BOJ board divided over rate pause and inflation risks, June summary shows',
        body: `Some Bank of Japan policymakers called for keeping interest rates steady due to uncertainty over the impact of U.S. tariffs on Japan's economy. Others said inflation was moving higher than expected, with one member suggesting the BOJ may need to raise rates "decisively" despite economic uncertainties.`,
        image_url:
          'https://www.reuters.com/resizer/v2/L4VXZ4CKY5IW3EGRWWPODGVUYQ.jpg?auth=ff2968ecd920f3b4a4722adccaa8ef9bc4d2126f0c7b79720a2044763e9e0ae6&quality=80&width=5201',
        author: 'Leika Kihara',
        date: new Date('2025-06-25T01:27:00Z'),
      },
      {
        title: 'Oil prices gain on signs of strong US demand',
        body: `Oil prices rose over 1% on Wednesday, recovering from a sharp slide early this week, as data showed relatively strong U.S. demand, and as investors assessed the stability of a ceasefire between Iran and Israel. Futures were supported by expectations of a Federal Reserve rate cut later this year, which could spur economic growth and oil consumption.`,
        image_url:
          'https://www.reuters.com/resizer/v2/5O4E25KMKZKVZLQG6WSH7IU7XQ.jpg?auth=c1ec62d39ac6bfc54a18396ee6f7645bc75311777c5459f207f80904a9b2a5bd&quality=80&width=5500',
        author: 'Stephanie Kelly',
        date: new Date('2025-06-25T15:17:00Z'),
      },
      {
        title:
          'Trump to extend TikTok sale deadline for third time, White House says',
        body: `U.S. President Donald Trump will extend a June 19 deadline for ByteDance to divest TikTok’s U.S. assets by 90 days despite legal mandates. He had already twice granted reprieves, saying he wants Americans to keep using the app with data-security assurances.`,
        image_url:
          'https://www.reuters.com/resizer/v2/ZDLW4MMN3ZICNIFGYKBVNGB53Y.jpg?auth=ce4e744eb921bdacf100582a275826d3328ca0aeb200173983873cb2f2776e6b&quality=80&width=3000',
        author: 'David Shepardson',
        date: new Date('2025-06-18T09:16:00Z'),
      },
      {
        title:
          "High energy costs threaten UK manufacturing's future, industry warns",
        body: `Britain needs to cut industrial energy bills—the highest among major advanced economies—to support its manufacturing sector, Make UK said. It urged cancellation of climate levies and adoption of a fixed industrial energy price to attract investment.`,
        image_url:
          'https://www.reuters.com/resizer/v2/DWOSQZBW65K6DH7JKDTUIQGEVA.jpg?auth=31fb1897bed86f0350b0f017a7fa029b5cb64afce68bd83cb253b8fecc7e5a63&quality=80&width=5500',
        author: 'Andy Bruce',
        date: new Date('2025-06-01T23:08:00Z'),
      },
      {
        title: "Japan's ispace fails again: Resilience lander crashes on moon",
        body: `Japanese company ispace said its uncrewed moon lander likely crashed onto the lunar surface during its touchdown attempt, marking another failure. The lander’s distance-measuring issues prevented a soft landing, cutting communication before descent was complete.`,
        image_url:
          'https://www.reuters.com/resizer/v2/SNO5R3C4PBNSBIIBNXCGEBOA54.jpg?auth=6251c9d4680947d37c90e43a9668eee023f8384300782018faf9f2709b17906f&quality=80&width=1080',
        author: 'Kantaro Komiya',
        date: new Date('2025-06-06T12:28:00Z'),
      },
      {
        title:
          'UK inflation slows but oil price jump creates new problem for Bank of England',
        body: `British inflation cooled to 3.4% in May, as expected, but a 14% jump in oil prices due to Middle East tensions complicates the BoE’s outlook. The central bank is likely to hold rates steady while monitoring energy market volatility.`,
        image_url:
          'https://www.reuters.com/resizer/v2/F7XT4USQ4NNXFC37ZXAM5IHNKE.jpg?auth=938190833dfccae787e331c344687d8ac665e9a10ec3c70bda4adb593641a3eb&quality=80&width=1080',
        author: 'Andy Bruce and William Schomberg',
        date: new Date('2025-06-18T12:01:00Z'),
      },
      {
        title: "China's factory activity cools in May as US tariffs hit",
        body: `China’s Caixin manufacturing PMI fell to 48.3 in May from 50.4 in April, marking the first contraction in eight months as U.S. tariffs begin to bite. New export orders shrank at the fastest pace since July 2023.`,
        image_url:
          'https://www.reuters.com/resizer/v2/UMVBROCUWBLMRFR4HHASRVHDEA.jpg?auth=a69562614eff6d7fb5fa629ca273f1f391fef4564f29065f3b91e26c624562a1&quality=80&width=3600',
        author: 'Reuters',
        date: new Date('2025-06-03T09:14:00Z'),
      },
      {
        title:
          'US business activity moderates; inflation pressures building up',
        body: `U.S. business activity slowed marginally in June while prices rose further amid aggressive tariffs, suggesting inflation may accelerate later this year. Existing home sales in May hit the lowest pace since 2009 as mortgage rates climbed.`,
        image_url:
          'https://www.reuters.com/resizer/v2/KYT3DEOVNVNZ3IJP7ISX2I2ABE.jpg?auth=51a3936afff710d83d22db18d975c018e5154adb34e6e6b592777d00c48b91eb&quality=80&width=5840',
        author: 'Lucia Mutikani',
        date: new Date('2025-06-23T16:11:00Z'),
      },
      {
        title:
          "Lula vows to defend Brazil's Supreme Court as US threatens judge",
        body: `President Lula da Silva vowed to defend Brazil’s Supreme Court against potential U.S. sanctions targeting Justice Alexandre de Moraes. He called foreign commentary on Brazil’s judiciary “unacceptable interference.”`,
        image_url:
          'https://www.reuters.com/resizer/v2/5WWV5N5WONNJPAGH3L76MMUVXE.jpg?auth=4495ca85ec7a9fb7f726652cb60351e9d8ca21f65ff49bd242524f77ffb16f45&quality=80&width=3582',
        author: 'Manuela Andreoni',
        date: new Date('2025-06-03T20:00:00Z'),
      },
      {
        title: 'India File: EV hopes hit by China rare earths curbs',
        body: `China’s export curbs on rare earth materials and magnets threaten India’s electric vehicle sector, with manufacturers warning of a production halt in July if supplies don’t resume. New Delhi plans incentive schemes to spur domestic magnet production.`,
        image_url:
          'https://www.reuters.com/resizer/v2/BNLZIHVLRRKYHIJ4QPC4QE2WWY.jpg?auth=a03d4c645582b66e0f7a4a57ba5eb3fc76be1994230da345a24c75ab34892d48&quality=80&width=6000',
        author: 'Aditi Shah',
        date: new Date('2025-06-18T04:25:00Z'),
      },
      {
        title:
          "Japan's ispace counts down to second moon-landing attempt on Friday",
        body: `ispace aims for a controlled moon touchdown on Friday, two years after its inaugural mission failed. The mission underscores Japan’s commitment to lunar exploration under NASA’s Artemis program, carrying a rover and scientific payloads.`,
        image_url:
          'https://www.reuters.com/resizer/v2/42BAZUP3KVP2PCPDMXJNYNOHRE.jpg?auth=95c14b5207b62c9735950b0e01f72289a1ecd18bd55ed298fc7d85d59eecc17a&quality=80&width=5500',
        author: 'Kantaro Komiya',
        date: new Date('2025-06-04T23:03:00Z'),
      },
      {
        title:
          'Sterling slips versus dollar as inflation print, BoE meeting eyed',
        body: `Sterling was lower against the dollar as markets focused on Middle East developments, ahead of May inflation data and Thursday’s Bank of England rate decision. Traders expect inflation to ease slightly and hold policy steady.`,
        image_url:
          'https://www.reuters.com/resizer/v2/RAPPL2AASJIUXJ2UPEYHARKPC4.jpg?auth=b86e1ab8b5be7454846bc331e9ae07a8fb421674bbb1dd56a017569666b48713&quality=80&width=4000',
        author: 'Reuters',
        date: new Date('2025-06-17T12:28:00Z'),
      },
    ];
    await this.newsRepo.save(initial);
    console.log('>>> Seeder: inserted', initial.length, 'news items');
  }
}
