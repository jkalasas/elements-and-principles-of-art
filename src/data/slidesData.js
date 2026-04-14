const slidesData = [
  // SLIDE 1 - TITLE SLIDE
  {
    type: 'title',
    id: 'title',
    title: 'Elements and Principles of Art',
    subtitle: 'Understanding Visual Language Through Analysis',
  },

  // SLIDE 2 - SECTION INTRO / ROADMAP
  {
    type: 'sectionIntro',
    id: 'roadmap',
    sectionLabel: 'Roadmap',
    sectionNumber: '01',
    title: "What We'll Explore",
    description:
      '**Elements of Art** — The building blocks of visual composition\n\n**Principles of Art** — How artists organize those elements\n\n**Interrelatedness** — How elements and principles work together in real artworks\n\n**Hybrid Art** — When art forms combine to create something new',
  },

  // SLIDE 3 - ARTWORK: Line
  {
    type: 'artwork',
    id: 'line',
    sectionLabel: 'Elements of Art',
    title: 'Line',
    definition:
      'Lines are marks that connect two points. They can be straight, curved, thick, thin, horizontal, vertical, or diagonal. Lines define edges, create movement, and guide the viewer\'s eye through a composition.',
    artwork: [
      {
        imageSrc: '/images/elements/line.jpg',
        imageAlt: 'Artwork demonstrating use of line',
        attribution:
          'Paul Klee, Ad Parnassum, 1927 — Kunstmuseum Bern / Google Art Project / Wikimedia Commons',
        contentTitle: 'How Line Works Here',
        content:
          'Observe how the artist uses line as the primary structural element. Lines create boundaries between forms, suggest direction and flow, and establish a visual pathway for the eye to follow. Whether bold and expressive or delicate and precise, lines carry emotional weight and meaning.',
      },
    ],
  },

  // SLIDE 4 - ARTWORK: Shape
  {
    type: 'artwork',
    id: 'shape',
    sectionLabel: 'Elements of Art',
    title: 'Shape',
    definition:
      'Shapes are two-dimensional areas defined by boundaries. They can be geometric (circles, squares, triangles) or organic (free-form, natural). Shapes create structure and can suggest depth, balance, or tension.',
    artwork: [
      {
        imageSrc: '/images/elements/shape.jpg',
        imageAlt: 'Artwork demonstrating use of shape',
        attribution:
          'Wassily Kandinsky, Composition VIII, 1923 — Guggenheim Museum / Google Art Project / Wikimedia Commons',
        contentTitle: 'How Shape Works Here',
        content:
          'This artwork demonstrates the power of shape to organize visual space. Geometric shapes create order and precision, while organic shapes suggest natural forms and fluidity. The interplay between positive shapes (the forms themselves) and negative space (the areas around them) creates visual tension and interest.',
      },
    ],
  },

  // SLIDE 5 - ARTWORK: Form
  {
    type: 'artwork',
    id: 'form',
    sectionLabel: 'Elements of Art',
    title: 'Form',
    definition:
      'Form refers to three-dimensional objects or the illusion of 3D in 2D work. Forms have height, width, and depth. They can be actual (sculpture) or implied through shading and perspective in drawings and paintings.',
    artwork: [
      {
        imageSrc: '/images/elements/form.jpg',
        imageAlt: 'Artwork demonstrating use of form',
        attribution:
          'Michelangelo, David, 1501–1504 — Galleria dell\'Accademia, Florence / Wikimedia Commons',
        contentTitle: 'How Form Works Here',
        content:
          'The artist creates a convincing sense of three-dimensionality through careful attention to how light interacts with surfaces. Whether this is an actual 3D sculpture or a 2D work creating the illusion of depth, form gives the artwork physical presence and weight in space.',
      },
    ],
  },

  // SLIDE 6 - ARTWORK: Value
  {
    type: 'artwork',
    id: 'value',
    sectionLabel: 'Elements of Art',
    title: 'Value',
    definition:
      'Value refers to the lightness or darkness of a color or tone. It creates contrast, defines form, and establishes mood. A wide value range creates drama, while a narrow range produces subtlety and atmosphere.',
    artwork: [
      {
        imageSrc: '/images/elements/value.jpg',
        imageAlt: 'Artwork demonstrating use of value',
        attribution:
          'Caravaggio, The Calling of Saint Matthew, c. 1599–1600 — Contarelli Chapel, San Luigi dei Francesi, Rome / Wikimedia Commons',
        contentTitle: 'How Value Works Here',
        content:
          'Notice how the artist uses extreme contrasts between light and dark to create dramatic impact. The brightest areas draw the eye immediately, while shadows conceal and reveal selectively. This technique, called chiaroscuro, uses value not just to describe form but to direct attention and create emotional intensity.',
      },
    ],
  },

  // SLIDE 7 - ARTWORK: Space
  {
    type: 'artwork',
    id: 'space',
    sectionLabel: 'Elements of Art',
    title: 'Space',
    definition:
      'Space is the area within, around, between, above, or below elements in a work. Artists create the illusion of depth on a 2D surface using perspective, overlapping, size variation, and atmospheric effects. Space can also refer to negative space — the empty areas that define forms.',
    artwork: [
      {
        imageSrc: '/images/elements/space.jpg',
        imageAlt: 'Artwork demonstrating use of space',
        attribution:
          'Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831 — Public Domain / Wikimedia Commons',
        contentTitle: 'How Space Works Here',
        content:
          'This artwork masterfully manipulates space to create depth and scale. The foreground, middle ground, and background are clearly distinguished. The vast empty sky contrasts with the dense activity below, creating a sense of the sublime — the feeling of being overwhelmed by nature\'s scale and power.',
      },
    ],
  },

  // SLIDE 8 - ARTWORK: Color
  {
    type: 'artwork',
    id: 'color',
    sectionLabel: 'Elements of Art',
    title: 'Color',
    definition:
      'Color is the most expressive element, composed of hue (the color name), saturation (intensity), and value (lightness/darkness). Colors carry emotional associations and can create harmony or tension through their relationships on the color wheel.',
    artwork: [
      {
        imageSrc: '/images/elements/color.jpg',
        imageAlt: 'Artwork demonstrating use of color',
        attribution:
          'Vincent van Gogh, Sunflowers, 1888 — National Gallery, London / Wikimedia Commons',
        contentTitle: 'How Color Works Here',
        content:
          "The artist's bold use of color creates an immediate emotional response. Warm colors advance toward the viewer while cool colors recede, creating spatial depth. The intensity and saturation of the colors convey energy, passion, and vitality that go far beyond simple representation.",
      },
    ],
  },

  // SLIDE 9 - ARTWORK: Texture
  {
    type: 'artwork',
    id: 'texture',
    sectionLabel: 'Elements of Art',
    title: 'Texture',
    definition:
      'Texture is the surface quality of an artwork — how it feels or appears to feel. Actual texture is physical and tactile (thick paint, rough stone). Implied texture is visual, created through technique to suggest how something would feel if touched.',
    artwork: [
      {
        imageSrc: '/images/elements/texture.jpg',
        imageAlt: 'Artwork demonstrating use of texture',
        attribution:
          'Vincent van Gogh, The Starry Night, 1889 — Museum of Modern Art, New York / Google Art Project / Wikimedia Commons',
        contentTitle: 'How Texture Works Here',
        content:
          "The artist's visible brushstrokes create a rich, tactile surface. This impasto technique — applying paint thickly enough that brush or knife marks are visible — adds a physical dimension to the work. The texture itself becomes expressive, conveying the artist's energy and emotional state through the physicality of the paint.",
      },
    ],
  },

  // SLIDE 10 - RECAP: Elements
  {
    type: 'recap',
    id: 'elements-recap',
    sectionLabel: 'Elements of Art',
    title: 'The Seven Elements — Recap',
    items: [
      '**Line** — Marks connecting points, creating direction and movement',
      '**Shape** — 2D areas defined by boundaries (geometric or organic)',
      '**Form** — 3D objects or the illusion of depth',
      '**Value** — Lightness and darkness, creating contrast and mood',
      '**Space** — Areas within, around, and between elements',
      '**Color** — Hue, saturation, and value — the most expressive element',
      '**Texture** — Surface quality, real or implied',
    ],
    footerText:
      'These are the building blocks. The principles tell us how to arrange them.',
  },

  // SLIDE 11 - SECTION INTRO: Principles
  {
    type: 'sectionIntro',
    id: 'principles-intro',
    sectionLabel: 'Principles of Art',
    sectionNumber: '02',
    title: 'Principles of Art',
    description:
      'The principles of art are how artists organize the elements within a work.\nThey are the grammar that gives visual language structure and meaning.',
  },

  // SLIDE 12 - ARTWORK: Rhythm
  {
    type: 'artwork',
    id: 'rhythm',
    sectionLabel: 'Principles of Art',
    title: 'Rhythm',
    definition:
      'Rhythm is created through the repetition of visual elements — lines, shapes, colors, or textures. Like musical rhythm, visual rhythm creates a sense of organized movement and tempo. It can be regular (predictable), alternating (patterned), flowing (continuous), or progressive (gradually changing).',
    artwork: [
      {
        imageSrc: '/images/principles/rhythm.jpg',
        imageAlt: 'Artwork demonstrating rhythm',
        attribution:
          'Piet Mondrian, Composition with Red Blue and Yellow, 1930 — Kunstmuseum Basel / Wikimedia Commons',
        contentTitle: 'How Rhythm Works Here',
        content:
          'The repeated elements in this composition create a visual beat that guides the eye across the canvas. Notice how the repetition is not monotonous — variations in size, spacing, or color keep the rhythm dynamic and engaging, much like syncopation in music.',
      },
    ],
  },

  // SLIDE 13 - ARTWORK: Balance
  {
    type: 'artwork',
    id: 'balance',
    sectionLabel: 'Principles of Art',
    title: 'Balance',
    definition:
      'Balance is the distribution of visual weight in a composition. Symmetrical balance mirrors elements across a central axis, creating formality and stability. Asymmetrical balance uses different elements of equal visual weight, creating dynamic equilibrium. Radial balance arranges elements around a central point.',
    artwork: [
      {
        imageSrc: '/images/principles/balance.jpg',
        imageAlt: 'Artwork demonstrating balance',
        attribution:
          'Leonardo da Vinci, The Last Supper, 1495–1498 — Santa Maria delle Grazie, Milan / Wikimedia Commons',
        contentTitle: 'How Balance Works Here',
        content:
          'Observe how the artist distributes visual weight across the composition. Each element is carefully positioned to create equilibrium — whether through symmetrical mirroring or the more subtle achievement of asymmetrical balance, where different elements achieve equal visual impact through contrast in size, color, or placement.',
      },
    ],
  },

  // SLIDE 14 - ARTWORK: Emphasis
  {
    type: 'artwork',
    id: 'emphasis',
    sectionLabel: 'Principles of Art',
    title: 'Emphasis (Contrast)',
    definition:
      'Emphasis creates a focal point — the area that draws the viewer\'s attention first. Contrast is one of the most powerful tools for creating emphasis: differences in color, value, size, texture, or shape make certain elements stand out. Without emphasis, a composition can feel flat and directionless.',
    artwork: [
      {
        imageSrc: '/images/principles/emphasis.jpg',
        imageAlt: 'Artwork demonstrating emphasis and contrast',
        attribution:
          'Edvard Munch, The Scream, 1893 — National Gallery of Norway / Wikimedia Commons',
        contentTitle: 'How Emphasis Works Here',
        content:
          'The artist creates a clear focal point through stark contrast — whether through dramatic differences in light and dark, vibrant color against muted tones, or a large element among smaller ones. Your eye is immediately drawn to the area of greatest contrast, establishing a visual hierarchy.',
      },
    ],
  },

  // SLIDE 15 - ARTWORK: Proportion
  {
    type: 'artwork',
    id: 'proportion',
    sectionLabel: 'Principles of Art',
    title: 'Proportion',
    definition:
      'Proportion refers to the size relationships between elements within a work and to the work as a whole. Classical proportion follows mathematical ratios (like the Golden Ratio), while distorted proportion can create expressiveness, humor, or unease. Proportion affects how we relate to what we see.',
    artwork: [
      {
        imageSrc: '/images/principles/proportion.jpg',
        imageAlt: 'Artwork demonstrating proportion',
        attribution:
          'Kouros of Anavyssos, c. 530 BCE — National Archaeological Museum, Athens / Wikimedia Commons',
        contentTitle: 'How Proportion Works Here',
        content:
          'The careful proportions in this work create a sense of ideal beauty and harmony. The relationships between parts — the size of the head to the body, the width to the height — follow mathematical ratios that feel inherently pleasing. When artists deliberately distort proportion, they create emphasis, express emotion, or challenge our expectations.',
      },
    ],
  },

  // SLIDE 16 - ARTWORK: Gradation
  {
    type: 'artwork',
    id: 'gradation',
    sectionLabel: 'Principles of Art',
    title: 'Gradation',
    definition:
      'Gradation is a gradual transition from one state to another — light to dark, large to small, warm to cool. It creates a sense of movement, depth, and visual interest. Gradation can suggest three-dimensional form, atmospheric perspective, or emotional progression within a single work.',
    artwork: [
      {
        imageSrc: '/images/principles/gradation.jpg',
        imageAlt: 'Artwork demonstrating gradation',
        attribution:
          'Mark Rothko, Seagram Murals, 1958–1959 — Fondation Louis Vuitton, Paris / Wikimedia Commons',
        contentTitle: 'How Gradation Works Here',
        content:
          'The subtle transitions between colors or values create a sense of depth and atmosphere. Unlike abrupt contrasts, gradation invites the viewer to linger and explore the space between states. This gradual shift creates visual tension that resolves slowly, producing a meditative or immersive experience.',
      },
    ],
  },

  // SLIDE 17 - ARTWORK: Harmony
  {
    type: 'artwork',
    id: 'harmony',
    sectionLabel: 'Principles of Art',
    title: 'Harmony',
    definition:
      'Harmony is the sense of unity and cohesion in a work — when all elements feel like they belong together. It is achieved through repetition of similar elements, consistent color schemes, or shared visual qualities. Harmony creates a feeling of completeness and satisfaction.',
    artwork: [
      {
        imageSrc: '/images/principles/harmony.jpg',
        imageAlt: 'Artwork demonstrating harmony',
        attribution:
          'Claude Monet, Impression, Sunrise, 1872 — Musee Marmottan Monet, Paris / Wikimedia Commons',
        contentTitle: 'How Harmony Works Here',
        content:
          'Every element in this composition feels connected and purposeful. The artist achieves harmony through a unified color palette, repeated shapes or motifs, and a consistent mood or atmosphere. Nothing feels out of place — the work exists as a complete, self-contained visual world.',
      },
    ],
  },

  // SLIDE 18 - ARTWORK: Variety
  {
    type: 'artwork',
    id: 'variety',
    sectionLabel: 'Principles of Art',
    title: 'Variety',
    definition:
      'Variety introduces diversity and contrast to prevent monotony. It uses different elements — varied shapes, colors, textures, sizes — to create visual interest and complexity. Too much variety creates chaos; too little creates boredom. The best works balance variety with harmony.',
    artwork: [
      {
        imageSrc: '/images/principles/variety.jpg',
        imageAlt: 'Artwork demonstrating variety',
        attribution:
          'Pieter Bruegel the Elder, The Tower of Babel, 1563 — Kunsthistorisches Museum, Vienna / Wikimedia Commons',
        contentTitle: 'How Variety Works Here',
        content:
          'This work is rich with diverse elements — multiple figures, varied activities, contrasting textures, and a wealth of visual detail. Each area offers something new to discover, rewarding close and repeated looking. The artist manages this variety without losing coherence, creating a world that is complex yet readable.',
      },
    ],
  },

  // SLIDE 19 - ARTWORK: Movement
  {
    type: 'artwork',
    id: 'movement',
    sectionLabel: 'Principles of Art',
    title: 'Movement',
    definition:
      'Movement is how the artist guides the viewer\'s eye through a composition and the suggestion of motion within the work. It can be literal (depicting things in motion) or implied (using lines, shapes, and composition to create a sense of flow). Movement gives art a temporal dimension — it unfolds over time as we look.',
    artwork: [
      {
        imageSrc: '/images/principles/movement.jpg',
        imageAlt: 'Artwork demonstrating movement',
        attribution:
          'Umberto Boccioni, Unique Forms of Continuity in Space, 1913 — Various collections / Wikimedia Commons',
        contentTitle: 'How Movement Works Here',
        content:
          "The artist captures motion in a way that makes the static image feel alive. Curving lines, dynamic poses, and compositional flow all contribute to a sense of energy and direction. The viewer's eye is pulled through the composition following the paths the artist has created.",
      },
    ],
  },

  // SLIDE 20 - RECAP: Principles
  {
    type: 'recap',
    id: 'principles-recap',
    sectionLabel: 'Principles of Art',
    title: 'The Eight Principles — Recap',
    items: [
      '**Rhythm** — Repetition creating visual tempo',
      '**Balance** — Distribution of visual weight (symmetrical or asymmetrical)',
      '**Emphasis (Contrast)** — Creating focal points through difference',
      '**Proportion** — Size relationships between elements',
      '**Gradation** — Gradual transitions creating depth and interest',
      '**Harmony** — Unity and cohesion across the composition',
      '**Variety** — Diversity preventing monotony',
      '**Movement** — Guiding the viewer\'s eye through the work',
    ],
    footerText:
      'Together, elements and principles create the full visual language.',
  },

  // SLIDE 21 - SECTION INTRO: Interrelatedness
  {
    type: 'sectionIntro',
    id: 'interrelatedness-intro',
    sectionLabel: 'Interrelatedness',
    sectionNumber: '03',
    title: 'Elements and Principles Working Together',
    description:
      'In real artworks, elements and principles don\'t exist in isolation.\nThey interact, reinforce, and sometimes contradict each other to create meaning.\nLet\'s analyze specific works to see this interplay in action.',
  },

  // SLIDE 22 - ANALYSIS: Starry Night
  {
    type: 'analysis',
    id: 'analysis-starry-night',
    sectionLabel: 'Interrelatedness',
    title: 'The Starry Night — Vincent van Gogh (1889)',
    artwork: {
      imageSrc: '/images/interrelatedness/starry-night.jpg',
      imageAlt: 'The Starry Night by Vincent van Gogh',
      attribution:
        'Vincent van Gogh, The Starry Night, 1889 — Museum of Modern Art, New York',
    },
    elementsAtPlay: [
      {
        label: 'Color',
        description:
          'Deep blues and vibrant yellows create emotional intensity. The complementary color scheme makes the stars and moon appear to glow against the dark sky.',
      },
      {
        label: 'Line',
        description:
          'Swirling, curving lines dominate the composition, creating energy and turbulence in the sky.',
      },
      {
        label: 'Value',
        description:
          'Strong contrast between bright celestial bodies and the dark blue sky draws the eye.',
      },
    ],
    principlesAtPlay: [
      {
        label: 'Rhythm',
        description:
          'Repeated swirl and curves create a visual rhythm pulling the eye across the canvas in circular motion.',
      },
      {
        label: 'Movement',
        description:
          'The swirling lines suggest motion — the sky appears alive and turbulent.',
      },
    ],
  },

  // SLIDE 23 - ANALYSIS: Great Wave
  {
    type: 'analysis',
    id: 'analysis-great-wave',
    sectionLabel: 'Interrelatedness',
    title: 'The Great Wave — Katsushika Hokusai (c. 1831)',
    artwork: {
      imageSrc: '/images/interrelatedness/great-wave.jpg',
      imageAlt: 'The Great Wave off Kanagawa by Hokusai',
      attribution:
        'Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831 — Public Domain / Wikimedia Commons',
    },
    elementsAtPlay: [
      {
        label: 'Line',
        description:
          "The powerful contour line of the wave creates a claw-like shape that dominates the composition, its curves echoing the smaller waves below.",
      },
      {
        label: 'Form',
        description:
          'The wave appears three-dimensional, towering over the tiny boats and Mount Fuji, creating a dramatic sense of scale.',
      },
      {
        label: 'Space',
        description:
          'The vast empty sky contrasts with the dense, active foreground, creating tension between openness and claustrophobia.',
      },
    ],
    principlesAtPlay: [
      {
        label: 'Balance',
        description:
          'Asymmetrical balance — the massive wave on the left is counterweighted by the small but significant Mount Fuji on the right.',
      },
      {
        label: 'Emphasis',
        description:
          'The wave is the undeniable focal point, its size and position commanding immediate attention.',
      },
    ],
  },

  // SLIDE 24 - ANALYSIS: Third of May 1808
  {
    type: 'analysis',
    id: 'analysis-third-of-may',
    sectionLabel: 'Interrelatedness',
    title: 'The Third of May 1808 — Francisco Goya (1814)',
    artwork: {
      imageSrc: '/images/interrelatedness/third-of-may.jpg',
      imageAlt: 'The Third of May 1808 by Francisco Goya',
      attribution:
        'Francisco Goya, The Third of May 1808, 1814 — Museo del Prado, Madrid / Wikimedia Commons',
    },
    elementsAtPlay: [
      {
        label: 'Value',
        description:
          'The stark contrast between the brightly lit central figure and the surrounding darkness creates a theatrical, harrowing scene.',
      },
      {
        label: 'Shape',
        description:
          'The angular, geometric firing squad contrasts with the organic, collapsing forms of the victims, creating visual opposition.',
      },
      {
        label: 'Color',
        description:
          "The limited palette — mostly dark earth tones with the brilliant white and yellow of the central figure's shirt — focuses all attention on the man about to be executed.",
      },
    ],
    principlesAtPlay: [
      {
        label: 'Contrast',
        description:
          'Light vs. dark, individual vs. faceless group, life vs. death — every contrast in the painting heightens the emotional drama.',
      },
      {
        label: 'Variety',
        description:
          'The diverse reactions of the victims — defiance, prayer, collapse — create a panorama of human responses to mortality.',
      },
    ],
  },

  // SLIDE 25 - RECAP: Interrelatedness
  {
    type: 'recap',
    id: 'interrelatedness-recap',
    sectionLabel: 'Interrelatedness',
    title: 'Key Takeaway',
    items: [
      'Elements and principles are not separate categories.',
      'Every artwork uses them in combination:',
      '**Color + Rhythm + Movement** → emotional energy (Starry Night)',
      '**Line + Form + Balance + Emphasis** → dynamic tension (Great Wave)',
      '**Value + Shape + Contrast + Variety** → horror and empathy (Third of May 1808)',
    ],
    footerText:
      'Understanding art means seeing how these elements and principles interact to create meaning beyond what any single element could achieve alone.',
  },

  // SLIDE 26 - SECTION INTRO: Hybrid Art
  {
    type: 'sectionIntro',
    id: 'hybrid-intro',
    sectionLabel: 'Hybrid Art',
    sectionNumber: '04',
    title: 'When Art Forms Combine',
    description:
      'Hybrid art blends two or more distinct art forms, mediums, or techniques into a single work.\nThis fusion creates new expressive possibilities that neither form could achieve alone.',
  },

  // SLIDE 27 - ARTWORK: Digital Painting
  {
    type: 'artwork',
    id: 'digital-painting',
    sectionLabel: 'Hybrid Art',
    title: 'Digital Painting — Traditional Techniques Meet Digital Tools',
    definition: '',
    artwork: [
      {
        imageSrc: '/images/hybrid/digital-painting.jpg',
        imageAlt:
          'Digital painting combining traditional oil techniques with digital tools',
        attribution:
          'David Revoy, Alice in Wonderland, 2010 — Wikimedia Commons / CC BY 4.0',
        contentTitle: 'Art Forms Combined',
        content:
          '**Traditional Oil Painting:** Brushwork techniques, color mixing, compositional principles from centuries of painting tradition, understanding of light and shadow.\n\n**Digital Art:** Digital tablets, layering software, undo/redo capabilities, digital brushes that mimic or transcend physical media, infinite color precision.',
      },
    ],
  },

  // SLIDE 28 - ARTWORK: Sculpture + Projection
  {
    type: 'artwork',
    id: 'sculpture-projection',
    sectionLabel: 'Hybrid Art',
    title: 'Sculpture + Projection Mapping',
    definition: '',
    artwork: [
      {
        imageSrc: '/images/hybrid/sculpture-projection.jpg',
        imageAlt: 'Projection mapping artwork on sculptural forms at FILE festival',
        attribution:
          'Adam Pizurny, Faces projected at FILE Electronic Language International Festival, 2017 — São Paulo, Brazil / Wikimedia Commons / CC BY-SA 4.0',
        contentTitle: 'Art Forms Combined',
        content:
          '**Sculpture:** Three-dimensional physical form — stone, metal, or architectural structure — providing a tangible, permanent presence in space.\n\n**Projection Mapping:** Digital video and light projected onto the physical form, transforming the static object with animation, color, and motion.',
      },
    ],
  },

  // SLIDE 29 - ARTWORK: Photo + Collage
  {
    type: 'artwork',
    id: 'photo-collage',
    sectionLabel: 'Hybrid Art',
    title: 'Photography + Collage + Digital Manipulation',
    definition: '',
    artwork: [
      {
        imageSrc: '/images/hybrid/photo-collage.jpg',
        imageAlt:
          'Mixed-media work combining photography, collage, and digital manipulation',
        attribution:
          'Hannah Höch, Cut with the Kitchen Knife Dada Through the Last Weimar Beer-Belly Cultural Epoch in Germany, 1919 — Staatliche Museen zu Berlin / Wikimedia Commons',
        contentTitle: 'Art Forms Combined',
        content:
          '**Photography:** Capturing reality through the lens — documentary truth, specific moments frozen in time.\n\n**Collage:** Cutting, arranging, and assembling multiple images to create a new composition that transcends any single photograph.\n\n**Digital Manipulation:** Software tools for blending, color grading, and compositing that enable seamless integration of disparate elements.',
      },
    ],
  },

  // SLIDE 30 - RECAP: Hybrid Art
  {
    type: 'recap',
    id: 'hybrid-recap',
    sectionLabel: 'Hybrid Art',
    title: 'Hybrid Art Pushes Boundaries',
    items: [
      '**Digital + Traditional** → Preserves heritage while embracing new tools',
      '**Sculpture + Projection** → Transforms static objects into dynamic experiences',
      '**Photography + Collage + Digital** → Multiple perspectives in a single frame',
    ],
    footerText:
      'Hybrid art reflects our increasingly interconnected world —\nwhere boundaries between disciplines, mediums, and technologies\nare constantly being redefined and expanded.',
  },

  // SLIDE 31 - SUMMARY
  {
    type: 'summary',
    id: 'summary',
    title: "What We've Learned",
    items: [
      {
        label: 'Elements of Art',
        description:
          'The raw materials: Line, Shape, Form, Value, Space, Color, Texture',
      },
      {
        label: 'Principles of Art',
        description:
          'The organizing rules: Rhythm, Balance, Emphasis, Proportion, Gradation, Harmony, Variety, Movement',
      },
      {
        label: 'Interrelatedness',
        description:
          'Elements and principles work together in artworks to create meaning greater than the sum of their parts',
      },
      {
        label: 'Hybrid Art',
        description:
          'The boundaries between art forms are fluid and constantly evolving, creating new possibilities for expression',
      },
    ],
    closingStatement:
      'Art is a language. The elements are its vocabulary. The principles are its grammar. Together, they allow artists to communicate ideas, emotions, and perspectives that words alone cannot express.',
  },

  // SLIDE 32 - REFERENCES
  {
    type: 'references',
    id: 'references',
    title: 'Image Attributions',
    sections: [
      {
        sectionName: 'Elements of Art',
        attributions: [
          'Paul Klee, Ad Parnassum, 1927 — Kunstmuseum Bern / Google Art Project / Wikimedia Commons',
          'Wassily Kandinsky, Composition VIII, 1923 — Guggenheim Museum / Google Art Project / Wikimedia Commons',
          'Michelangelo, David, 1501–1504 — Galleria dell\'Accademia, Florence / Wikimedia Commons',
          'Caravaggio, The Calling of Saint Matthew, c. 1599–1600 — Contarelli Chapel, Rome / Wikimedia Commons',
          'Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831 — Public Domain / Wikimedia Commons',
          'Vincent van Gogh, Sunflowers, 1888 — National Gallery, London / Wikimedia Commons',
          'Vincent van Gogh, The Starry Night, 1889 — MoMA, New York / Google Art Project / Wikimedia Commons',
        ],
      },
      {
        sectionName: 'Principles of Art',
        attributions: [
          'Piet Mondrian, Composition with Red Blue and Yellow, 1930 — Kunstmuseum Basel / Wikimedia Commons',
          'Leonardo da Vinci, The Last Supper, 1495–1498 — Santa Maria delle Grazie, Milan / Wikimedia Commons',
          'Edvard Munch, The Scream, 1893 — National Gallery of Norway / Wikimedia Commons',
          'Kouros of Anavyssos, c. 530 BCE — National Archaeological Museum, Athens / Wikimedia Commons',
          'Mark Rothko, Seagram Murals, 1958–1959 — Fondation Louis Vuitton, Paris / Wikimedia Commons',
          'Claude Monet, Impression, Sunrise, 1872 — Musee Marmottan Monet, Paris / Wikimedia Commons',
          'Pieter Bruegel the Elder, The Tower of Babel, 1563 — Kunsthistorisches Museum, Vienna / Wikimedia Commons',
          'Umberto Boccioni, Unique Forms of Continuity in Space, 1913 — Various collections / Wikimedia Commons',
        ],
      },
      {
        sectionName: 'Interrelatedness',
        attributions: [
          'Vincent van Gogh, The Starry Night, 1889 — Museum of Modern Art, New York',
          'Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831 — Public Domain / Wikimedia Commons',
          'Francisco Goya, The Third of May 1808, 1814 — Museo del Prado, Madrid / Wikimedia Commons',
        ],
      },
      {
        sectionName: 'Hybrid Art',
        attributions: [
          'David Revoy, Alice in Wonderland, 2010 — Wikimedia Commons / CC BY 4.0',
          'Adam Pizurny, Faces at FILE Festival 2017 — Wikimedia Commons / CC BY-SA 4.0',
          'Hannah Höch, Cut with the Kitchen Knife Dada, 1919 — Staatliche Museen zu Berlin / Wikimedia Commons',
        ],
      },
    ],
  },

  // SLIDE 33 - MC 1
  {
    type: 'quiz',
    id: 'quiz-mc-1',
    sectionLabel: 'Review Questions',
    title: 'Multiple Choice',
    question: {
      number: 1,
      question: 'Which of the following is NOT one of the seven elements of art?',
      options: ['Line', 'Shape', 'Rhythm', 'Texture'],
    },
  },

  // SLIDE 34 - MC 2
  {
    type: 'quiz',
    id: 'quiz-mc-2',
    sectionLabel: 'Review Questions',
    title: 'Multiple Choice',
    question: {
      number: 2,
      question: 'Form differs from shape because form has:',
      options: ['Color', 'Height, width, and depth', 'Texture', 'Boundaries'],
    },
  },

  // SLIDE 35 - MC 3
  {
    type: 'quiz',
    id: 'quiz-mc-3',
    sectionLabel: 'Review Questions',
    title: 'Multiple Choice',
    question: {
      number: 3,
      question: 'Which principle of art is created through the repetition of visual elements?',
      options: ['Balance', 'Rhythm', 'Emphasis', 'Proportion'],
    },
  },

  // SLIDE 36 - MC 4
  {
    type: 'quiz',
    id: 'quiz-mc-4',
    sectionLabel: 'Review Questions',
    title: 'Multiple Choice',
    question: {
      number: 4,
      question: 'A gradual transition from one state to another (light to dark, large to small) is called:',
      options: ['Harmony', 'Gradation', 'Variety', 'Rhythm'],
    },
  },

  // SLIDE 37 - MC 5
  {
    type: 'quiz',
    id: 'quiz-mc-5',
    sectionLabel: 'Review Questions',
    title: 'Multiple Choice',
    question: {
      number: 5,
      question: 'Color is composed of three components:',
      options: ['Line, shape, and form', 'Hue, saturation, and value', 'Light, dark, and medium', 'Warm, cool, and neutral'],
    },
  },

  // SLIDE 38 - TRUE OR FALSE
  {
    type: 'quiz',
    id: 'quiz-true-false',
    sectionLabel: 'Review Questions',
    title: 'True or False',
    questions: [
      { question: 'Elements of art are the building blocks used to create a visual composition.', type: 'truefalse' },
      { question: 'Emphasis creates a focal point by using contrast to make certain elements stand out.', type: 'truefalse' },
      { question: 'Actual texture is physical and tactile, while implied texture is visual.', type: 'truefalse' },
      { question: 'Too much variety in a composition creates harmony.', type: 'truefalse' },
      { question: 'Movement in art can be literal (depicting motion) or implied (using compositional flow).', type: 'truefalse' },
    ],
  },

  // SLIDE 39 - MATCHING
  {
    type: 'quiz',
    id: 'quiz-matching',
    sectionLabel: 'Review Questions',
    title: 'Matching',
    matchItems: [
      { term: 'Line', definition: 'The distribution of visual weight in a composition' },
      { term: 'Value', definition: 'Marks that connect two points' },
      { term: 'Texture', definition: 'The lightness or darkness of a color or tone' },
      { term: 'Balance', definition: 'Creating a focal point through contrast' },
      { term: 'Emphasis', definition: 'The surface quality of an artwork — how it feels or appears to feel' },
    ],
  },

  // SLIDE 40 - SHORT ANSWER
  {
    type: 'quiz',
    id: 'quiz-short-answer',
    sectionLabel: 'Review Questions',
    title: 'Short Answer',
    questions: [
      {
        question: 'Explain how elements and principles of art work together in a real artwork.',
        type: 'shortanswer',
      },
    ],
  },

  // SLIDE 41 - CLOSING
  {
    type: 'closing',
    id: 'closing',
    sectionLabel: 'Elements and Principles of Art',
    icon: '◆',
    title: 'Questions?',
  },
];

export default slidesData;
