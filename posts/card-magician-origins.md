# Card Magician - Origins
Several odd months ago, I discovered 
[a project by ItsNotGood](https://www.youtube.com/watch?v=XqmPFT4GfkE) 
to make a custom Magic: The Gathering set based on classic and nostalgic Yu-Gi-Oh cards.
This was my first exposure to custom Magic, a niche internet community built around
creating custom sets of magic cards which are designed to be played in both limited and 
sometimes constructed environments. I had some exposure to a few custom Magic cards, but 
had never seen a project to make a whole custom set.

Seeing this project and the ideation of its design, I felt immediately inspired. I 
have always loved design, and having played Yu-Gi-Oh in my own childhood, there were 
many cards that were not in this set that I had fond nostalgia for. So I asked about 
submitting additional designs for the set:

> mator — 9/4/2025 6:59 PM  
> finally watched the video on this, and I really like it. would it be helpful at all 
> to submit designs on additional yugioh cards?  
> Jawnie — 9/4/2025 7:01 PM  
> Yes, although it depends a little bit. In the pinned comments there is a link to the 
> suggestions form. IF you are just wanting to propose your own designs for cards taht 
> dont necesarrily fit into the current set, I would post them in this channel. There 
> is likely to be a set 2 in the future.  
> mator — 9/4/2025 7:02 PM  
> yeah that's what I was thinking, that future sets would be really cool
> and I kind of just want to try some designs myself because it looks really fun and I 
> like the way you thought about it  
> Jawnie — 9/4/2025 7:02 PM  
> Hell yeah dude! Yeah we have been discussion 5Ds era stuff, but the next set is 
> likely to focus heavily on synchros

Little did I know, this moment would kick off a sequence of events that would change 
my life forever.

## In the beginning, there was Magic Set Editor
One of the first questions I thought to ask was what people were using to make cards. 
I had used a few tools before, but wanted to know what the preferred tool was. The 
response I received was a glowing endorsement of Magic Set Editor.

I started designing cards. The first card I designed was Labyrinth Wall. Then 
Labyrinth Tank. Next came Slot Machine, Mechanicalchaser, Patrol Robo. Pretty soon, I 
was hooked. I've always been the type of person who loved building things, and with 
custom Magic cards I had discovered a whole new world to explore and learn about. Every
card felt like a unique and interesting design challenge. Translating the idea or vibe 
of the original Yu-Gi-Oh card to MtG, while also attempting to emulate the design 
philosophy foundations Jawnie had built in his "Yugioh as MTG" set while also 
connecting back to my own nostalgia and memories of MTG and Yugioh cards. The 
balancing act of all these different things was challenging, making every design feel 
rewarding – like playing a chord on a musical instrument.

Consistent feedback from the community, namely Badaaron and Jawnie, kept me engaged 
and excited about making cards. Many designs later, and with help from Badaaron, I 
created the Divide keyword for Ameba and Giant Germ.

![Ameba](assets/Ameba.png) ![Giant Germ](assets/Giant_Germ.png)

The design of this keyword was based on how certain Yugioh cards would allow you to 
tutor copies of them out of your deck and onto the battlefield when they die. The 
first of these that I encountered while porting cards from Yugioh was Giant Germ, but 
I knew that there were others. As I continued to design cards, I continued to use 
Divide and grew committed to the keyword based on positive feedback:

> Jawnie — 9/8/2025 3:07 PM  
> Divide is a really cool ability.  
> Very timing specific, so I imagine you will miss it a lot with bigger creatures and 
> your opponent can play around it super well. But That isnt a bad thing. IT will 
> encourage you to abuse it in your deck with things like sac outlets. Awesome idea

## Split Tokens
At some point later, I was listening to the MTG Drive to Work podcast by Mark 
Rosewater, specifically trying to learn more about the design lessons that Wizards of 
the Coast learned from Bloomburrow. The reason I was interested in Bloomburrow 
specifically was because the set had the Offspring mechanic, which has some mechanical 
similarity to Divide. He noted a very practical consideration with having to create 
alternate arts for all the cards that had Offspring printed on them. There was also 
the challenge of giving players enough game pieces to represent all the different 
tokens that could be produced in the set. This got the gears in my brain turning. If 
Divide was ever printed in paper, how could one possibly give players enough game 
pieces for Divide creatures with only a single token slot per pack?

This hypothetical wasn't purely pie-in-the-sky, as players had been printing Jawnie's 
Yugioh as MTG set to play with it in person. If that were to ever happen for my set, 
I would want to ensure that players would have a nice way to represent the tokens that 
are associated with the primary new keyword in my set.

That was when I came up with a cute idea: what if Divide creature tokens were printed 
as split cards? Doing that would allow for two tokens to be printed on a single card 
stock. Now if you have ever played MTG, you probably know that tokens are already 
printed as DFCs to resolve the exact issue of lacking game pieces. However, Divide is 
unique in that it always creates two token copies of the creature, so a simple DFC 
set-up would almost certainly be insufficient. I could also still make Divide tokens 
both split cards *and* DFCs.

You may also wonder how you would make a split card represent two separate game 
objects. For this I had a highly unconventional idea: print the cards with the 
intention of them being cut into two separate game pieces, potentially even with a
perforation to make separation possible by hand. This idea felt sacrilegious in a way 
that was exciting. MTG had historically only made physically altering game pieces a 
part of the game a few times – in un-sets. The fact that this would yield smaller game 
pieces was also cool, as it felt symbolically correct for a creature "Dividing" into 
copies of itself.

Needless to say, I was excited by the idea, so I started to go about trying to produce 
it in Magic Set Editor. However, seeing as a split token has never been printed 
before, there wasn't a way to create that kind of card in the software. I could make 
a split card, but I couldn't put Power/Toughness on it. I could make a token, but I 
couldn't make it use the split card shape. I would need to create a custom template
myself. I thought that surely it wouldn't be too difficult. I have nearly 10 years of 
Software Engineering experience and have extended many pieces of Software in similar 
capacities. It turns out, I couldn't be more wrong.

## Looking under the hood
The first thing I discovered when attempting to create a custom MSE template was the 
files had no extension. This was weird. Really weird. The only time I had ever seen 
files with no extension was when the files were binary files and of a proprietary file 
format that a game development company likely did not want other people to mess with.

I don't recall if I first tried to open the files in a hex editor or a text editor, 
but either way, I quickly discovered that they were, in fact, plaintext files. The 
syntax in the files was odd, though it vaguely reminded me of Lua. As I investigated 
the files, I discovered that they contained a combination of executable code, metadata, 
and style rules. I also quickly discovered that the files were often quite large - with 
several exceeding 1000 lines.

This immediately reminded me of my previous dev work with TES5Edit. TES5Edit's codebase
was similar, with massive files, some exceeding ten thousand lines of code. My experience 
with TES5Edit's codebase taught me about the long-term challenges of working with and 
building solutions in large, opaque codebases.

But I had a mission: I wanted to make split tokens. Surely it wouldn't be that hard 
to do, all I really needed was to add power and toughness to split cards, and that 
would be good enough as a starting point, with adding token-appropriate frames being a 
secondary goal.

First, I tried just adding the Power and Toughness fields to the split card, expecting 
that doing so would add the fields to the card. It didn't. It didn't add anything that I 
could tell. That was pretty weird to me. How could I be editing the code and seeing zero 
changes?

It took me nearly four hours trying many different things to eventually get something 
remotely close to a split card with power and toughness. It was frustrating and 
unintuitive. I really had no idea what was going on, and there was no good way for me to 
figure it out. The entire system felt like complete black magic. To some extent this is 
to be expected, but this situation just didn't seem right to me.

## What followed
As I had this experience, I did have a thought that this could be done better. The 
use of a DSL, the weird design choices, the completely unintuitive results, and the 
incredible inflexibility of the templates surely weren't all necessary evils. But to 
make software that could do what MSE does, including porting the vast quantity of 
community-created templates, would be a *massive* undertaking. It would take months 
if not years of developer time. So I dismissed the idea. It would be nice, but I'd 
just have to make MSE work.

Over the following months, I continued to design cards and eventually stumbled upon 
the MSE Discord. Later still, I stumbled upon the MSE documentation.

I learned in this process that MSE is *ancient* software. From what I have uncovered, 
it was made in the mid-2000s. This has several consequences, including derelict community 
relics such as old forums and GitHub repositories that have to be waded through to find 
the currently active parts of the community.

Another thing I discovered was that MSE is currently maintained by a skeleton crew of 
developers. These developers came to the software as previous maintainers handed it 
to them and disappeared into the wind, without providing any guidance or direction. 
This has resulted in large parts of the codebase being no longer understood. 
Furthermore, the maintainers have inherited many limitations from the software and 
have effectively been tasked with building houses out of glue and toothpicks.

I also took a look at the source code itself, and many of the decisions reflected in 
it were positively baffling to me. The choice to create a custom programming language 
for the templates particularly. My friend put it succinctly:

> Creating a DSL (Domain-Specific Language) is almost always the wrong choice.

This is because using an existing language is a superior choice for the longevity of a 
codebase. When you use an existing language, you get all of its functionality out of the 
box and can benefit from its continued development.

In the specific case of MSE, what we have is a tool effectively re-inventing the wheel to 
display a document which is composed of multiple backgrounds, masked images, and text 
elements. In the modern day this seems incredibly silly, because HTML and CSS are such 
powerful and capable technologies for solving this exact class of problem.

As I processed all of this information, I gradually grew amenable to the idea of 
making an MSE replacement. I was uniquely positioned as a Software Engineer with 
experience building user-facing tools not all that dissimilar to MSE (see 
[zEdit](https://github.com/z-edit/zedit)). I had a vested interest in making custom magic 
sets and knew other people who also had an interest in it. Meanwhile, MSE itself was 
like an old ship, creaking and groaning with ever-accumulating code debt and a 
skeleton crew of maintainers fighting against the current to add support for new card 
templates as WotC puts them out.

So, I decided to do it.
