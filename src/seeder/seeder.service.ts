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
    ];
    await this.newsRepo.save(initial);
    console.log('>>> Seeder: inserted', initial.length, 'news items');
  }
}
