#!/usr/bin/env python3
"""Generate a print-ready A4 PDF from the presentation slides data."""

import base64
import os
from pathlib import Path

import markdown
from weasyprint import HTML, CSS

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR
IMAGES_DIR = PROJECT_DIR / "public" / "images"
OUTPUT_PATH = PROJECT_DIR / "content.pdf"


def image_to_base64(image_path):
    img_path = Path(image_path)
    if not img_path.exists():
        return None
    ext = img_path.suffix.lower()
    mime_map = {
        ".jpg": "jpeg",
        ".jpeg": "jpeg",
        ".png": "png",
        ".webp": "webp",
        ".svg": "svg+xml",
    }
    mime = mime_map.get(ext, "jpeg")
    with open(img_path, "rb") as f:
        data = base64.b64encode(f.read()).decode()
    return f"data:image/{mime};base64,{data}"


def md_to_html(text):
    return markdown.markdown(text, extensions=["tables"])


def resolve_image_path(src):
    if src.startswith("/images/"):
        return IMAGES_DIR / src[len("/images/") :]
    return None


def render_markdown(text):
    if not text:
        return ""
    return md_to_html(text)


def get_artwork_image_data(src):
    path = resolve_image_path(src)
    if path:
        return image_to_base64(path)
    return None


# ── Slide data ──────────────────────────────────────────────────────────────

SLIDES = [
    {
        "type": "title",
        "title": "Elements and Principles of Art",
        "subtitle": "Understanding Visual Language Through Analysis",
    },
    {
        "type": "section_intro",
        "section_label": "Roadmap",
        "section_number": "01",
        "title": "What We'll Explore",
        "description": "**Elements of Art** — The building blocks of visual composition\n\n**Principles of Art** — How artists organize those elements\n\n**Interrelatedness** — How elements and principles work together in real artworks\n\n**Hybrid Art** — When art forms combine to create something new",
    },
    {
        "type": "artwork",
        "section_label": "Elements of Art",
        "title": "Line",
        "definition": "Lines are marks that connect two points. They can be straight, curved, thick, thin, horizontal, vertical, or diagonal. Lines define edges, create movement, and guide the viewer's eye through a composition.",
        "artwork": [
            {
                "image_src": "/images/elements/line.jpg",
                "attribution": "Paul Klee, Ad Parnassum, 1927 — Kunstmuseum Bern / Google Art Project / Wikimedia Commons",
                "content_title": "How Line Works Here",
                "content": "Observe how the artist uses line as the primary structural element. Lines create boundaries between forms, suggest direction and flow, and establish a visual pathway for the eye to follow. Whether bold and expressive or delicate and precise, lines carry emotional weight and meaning.",
                "meaning_label": "Meaning",
                "meaning_text": "Ad Parnassum is considered Paul Klee's masterpiece, composed of thousands of small dots and dashes of color that form a mosaic-like structure. The work demonstrates how line — even when broken into tiny marks — can create an entire visual world. The title references Mount Parnassus, home of the Muses in Greek mythology, suggesting this is Klee's ascent to artistic mastery through the fundamental element of line.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Elements of Art",
        "title": "Shape",
        "definition": "Shapes are two-dimensional areas defined by boundaries. They can be geometric (circles, squares, triangles) or organic (free-form, natural). Shapes create structure and can suggest depth, balance, or tension.",
        "artwork": [
            {
                "image_src": "/images/elements/shape.jpg",
                "attribution": "Wassily Kandinsky, Composition VIII, 1923 — Guggenheim Museum / Google Art Project / Wikimedia Commons",
                "content_title": "How Shape Works Here",
                "content": "This artwork demonstrates the power of shape to organize visual space. Geometric shapes create order and precision, while organic shapes suggest natural forms and fluidity. The interplay between positive shapes (the forms themselves) and negative space (the areas around them) creates visual tension and interest.",
                "meaning_label": "Meaning",
                "meaning_text": "Kandinsky's Composition VIII is a symphony of geometric shapes — circles, triangles, lines, and curves arranged in a carefully balanced non-representational composition. Created during his Bauhaus period, it reflects his belief that geometric forms carry spiritual meaning. The large circle dominates the composition, creating a focal point of calm amidst the dynamic geometric activity around it.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Elements of Art",
        "title": "Form",
        "definition": "Form refers to three-dimensional objects or the illusion of 3D in 2D work. Forms have height, width, and depth. They can be actual (sculpture) or implied through shading and perspective in drawings and paintings.",
        "artwork": [
            {
                "image_src": "/images/elements/form.jpg",
                "attribution": "Michelangelo, David, 1501–1504 — Galleria dell'Accademia, Florence / Wikimedia Commons",
                "content_title": "How Form Works Here",
                "content": "The artist creates a convincing sense of three-dimensionality through careful attention to how light interacts with surfaces. Whether this is an actual 3D sculpture or a 2D work creating the illusion of depth, form gives the artwork physical presence and weight in space.",
                "meaning_label": "Meaning",
                "meaning_text": "Michelangelo's David is the pinnacle of Renaissance sculpture, a 17-foot marble colossus that embodies ideal human form. Carved from a single block of marble that other sculptors had rejected as flawed, David demonstrates how form can express both physical perfection and psychological intensity. The figure stands in contrapposto — weight on one leg, body slightly turned — creating a dynamic tension between stillness and potential action, capturing the moment before David faces Goliath.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Elements of Art",
        "title": "Value",
        "definition": "Value refers to the lightness or darkness of a color or tone. It creates contrast, defines form, and establishes mood. A wide value range creates drama, while a narrow range produces subtlety and atmosphere.",
        "artwork": [
            {
                "image_src": "/images/elements/value.jpg",
                "attribution": "Caravaggio, The Calling of Saint Matthew, c. 1599–1600 — Contarelli Chapel, San Luigi dei Francesi, Rome / Wikimedia Commons",
                "content_title": "How Value Works Here",
                "content": "Notice how the artist uses extreme contrasts between light and dark to create dramatic impact. The brightest areas draw the eye immediately, while shadows conceal and reveal selectively. This technique, called chiaroscuro, uses value not just to describe form but to direct attention and create emotional intensity.",
                "meaning_label": "Meaning",
                "meaning_text": "The Calling of Saint Matthew depicts the moment Jesus summons the tax collector Matthew to become his disciple. Caravaggio's revolutionary use of value — a diagonal beam of light cutting through darkness — makes the divine visible. The light doesn't illuminate the whole scene; it selects, just as divine grace selects. Value becomes narrative: the contrast between light and dark mirrors the contrast between the worldly tax collectors and the spiritual calling that transforms them.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Elements of Art",
        "title": "Space",
        "definition": "Space is the area within, around, between, above, or below elements in a work. Artists create the illusion of depth on a 2D surface using perspective, overlapping, size variation, and atmospheric effects.",
        "artwork": [
            {
                "image_src": "/images/elements/space.jpg",
                "attribution": "Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831 — Public Domain / Wikimedia Commons",
                "content_title": "How Space Works Here",
                "content": "This artwork masterfully manipulates space to create depth and scale. The foreground, middle ground, and background are clearly distinguished. The vast empty sky contrasts with the dense activity below, creating a sense of the sublime — the feeling of being overwhelmed by nature's scale and power.",
                "meaning_label": "Meaning",
                "meaning_text": "The Great Wave is one of the most recognizable images in world art. Hokusai uses space to create a terrifying and beautiful confrontation between human fragility and nature's power. The massive wave dominates the foreground, its claw-like crest looming over the tiny fishermen in their boats. In the far distance, Mount Fuji sits small and serene — the eternal mountain dwarfed by the temporary fury of the sea.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Elements of Art",
        "title": "Color",
        "definition": "Color is the most expressive element, composed of hue (the color name), saturation (intensity), and value (lightness/darkness). Colors carry emotional associations and can create harmony or tension through their relationships on the color wheel.",
        "artwork": [
            {
                "image_src": "/images/elements/color.jpg",
                "attribution": "Vincent van Gogh, Sunflowers, 1888 — National Gallery, London / Wikimedia Commons",
                "content_title": "How Color Works Here",
                "content": "The artist's bold use of color creates an immediate emotional response. Warm colors advance toward the viewer while cool colors recede, creating spatial depth. The intensity and saturation of the colors convey energy, passion, and vitality that go far beyond simple representation.",
                "meaning_label": "Meaning",
                "meaning_text": "Van Gogh's Sunflowers series was painted in Arles to decorate the room where his friend Paul Gauguin would stay. The paintings are almost monochromatic — varying shades of yellow from pale lemon to deep ochre — yet they vibrate with emotional intensity. For Van Gogh, yellow was the color of happiness, friendship, and the life-giving sun. The sunflowers themselves are at various stages of bloom and decay, suggesting the cycle of life.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Elements of Art",
        "title": "Texture",
        "definition": "Texture is the surface quality of an artwork — how it feels or appears to feel. Actual texture is physical and tactile (thick paint, rough stone). Implied texture is visual, created through technique to suggest how something would feel if touched.",
        "artwork": [
            {
                "image_src": "/images/elements/texture.jpg",
                "attribution": "Vincent van Gogh, The Starry Night, 1889 — Museum of Modern Art, New York / Google Art Project / Wikimedia Commons",
                "content_title": "How Texture Works Here",
                "content": "The artist's visible brushstrokes create a rich, tactile surface. This impasto technique — applying paint thickly enough that brush or knife marks are visible — adds a physical dimension to the work. The texture itself becomes expressive, conveying the artist's energy and emotional state through the physicality of the paint.",
                "meaning_label": "Meaning",
                "meaning_text": "Painted from the window of Van Gogh's asylum room at Saint-Rémy-de-Provence, The Starry Night transforms a nocturnal landscape into a swirling vision of emotional intensity. The thick, rhythmic brushstrokes are not merely a technique — they are the physical record of the artist's hand moving across canvas, each stroke carrying the urgency and passion of Van Gogh's inner world.",
            }
        ],
    },
    {
        "type": "recap",
        "section_label": "Elements of Art",
        "title": "The Seven Elements — Recap",
        "items": [
            "**Line** — Marks connecting points, creating direction and movement",
            "**Shape** — 2D areas defined by boundaries (geometric or organic)",
            "**Form** — 3D objects or the illusion of depth",
            "**Value** — Lightness and darkness, creating contrast and mood",
            "**Space** — Areas within, around, and between elements",
            "**Color** — Hue, saturation, and value — the most expressive element",
            "**Texture** — Surface quality, real or implied",
        ],
        "footer_text": "These are the building blocks. The principles tell us how to arrange them.",
    },
    {
        "type": "section_intro",
        "section_label": "Principles of Art",
        "section_number": "02",
        "title": "Principles of Art",
        "description": "The principles of art are how artists organize the elements within a work. They are the grammar that gives visual language structure and meaning.",
    },
    {
        "type": "artwork",
        "section_label": "Principles of Art",
        "title": "Rhythm",
        "definition": "Rhythm is created through the repetition of visual elements — lines, shapes, colors, or textures. Like musical rhythm, visual rhythm creates a sense of organized movement and tempo.",
        "artwork": [
            {
                "image_src": "/images/principles/rhythm.jpg",
                "attribution": "Piet Mondrian, Composition with Red Blue and Yellow, 1930 — Kunstmuseum Basel / Wikimedia Commons",
                "content_title": "How Rhythm Works Here",
                "content": "The repeated elements in this composition create a visual beat that guides the eye across the canvas. Notice how the repetition is not monotonous — variations in size, spacing, or color keep the rhythm dynamic and engaging, much like syncopation in music.",
                "meaning_label": "Meaning",
                "meaning_text": "Mondrian's geometric abstractions reduce painting to its essential elements: horizontal and vertical lines, primary colors, and non-colors (white, gray, black). The rhythm in his compositions comes from the repeated grid structure and the placement of colored rectangles within it. This rhythm is not decorative — it expresses Mondrian's philosophical belief that beneath the apparent chaos of nature lies a universal order.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Principles of Art",
        "title": "Balance",
        "definition": "Balance is the distribution of visual weight in a composition. Symmetrical balance mirrors elements across a central axis. Asymmetrical balance uses different elements of equal visual weight. Radial balance arranges elements around a central point.",
        "artwork": [
            {
                "image_src": "/images/principles/balance.jpg",
                "attribution": "Leonardo da Vinci, The Last Supper, 1495–1498 — Santa Maria delle Grazie, Milan / Wikimedia Commons",
                "content_title": "How Balance Works Here",
                "content": "Observe how the artist distributes visual weight across the composition. Each element is carefully positioned to create equilibrium — whether through symmetrical mirroring or the more subtle achievement of asymmetrical balance.",
                "meaning_label": "Meaning",
                "meaning_text": "The Last Supper is a masterclass in compositional balance. Leonardo centers Christ at the exact midpoint of the long table, flanked by six apostles on each side. The architecture of the room creates a symmetrical framework that reinforces Christ's centrality. Yet the apostles' varied gestures and expressions create asymmetrical energy within the symmetrical structure.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Principles of Art",
        "title": "Emphasis (Contrast)",
        "definition": "Emphasis creates a focal point — the area that draws the viewer's attention first. Contrast is one of the most powerful tools: differences in color, value, size, texture, or shape make certain elements stand out.",
        "artwork": [
            {
                "image_src": "/images/principles/emphasis.jpg",
                "attribution": "Edvard Munch, The Scream, 1893 — National Gallery of Norway / Wikimedia Commons",
                "content_title": "How Emphasis Works Here",
                "content": "The artist creates a clear focal point through stark contrast — whether through dramatic differences in light and dark, vibrant color against muted tones, or a large element among smaller ones. Your eye is immediately drawn to the area of greatest contrast.",
                "meaning_label": "Meaning",
                "meaning_text": "The Scream is one of the most iconic images in art history. The central figure — a gaunt, ghostly figure with a skull-like head and open mouth — is immediately the focal point. The swirling, blood-red sky behind it contrasts sharply with the figure's pale, deathly pallor. The emphasis is not just visual but emotional.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Principles of Art",
        "title": "Proportion",
        "definition": "Proportion refers to the size relationships between elements within a work and to the work as a whole. Classical proportion follows mathematical ratios (like the Golden Ratio), while distorted proportion can create expressiveness, humor, or unease.",
        "artwork": [
            {
                "image_src": "/images/principles/proportion.jpg",
                "attribution": "Kouros of Anavyssos, c. 530 BCE — National Archaeological Museum, Athens / Wikimedia Commons",
                "content_title": "How Proportion Works Here",
                "content": "The careful proportions in this work create a sense of ideal beauty and harmony. The relationships between parts — the size of the head to the body, the width to the height — follow mathematical ratios that feel inherently pleasing.",
                "meaning_label": "Meaning",
                "meaning_text": "The Kouros of Anavyssos is an Archaic Greek statue that embodies the Greek pursuit of ideal proportion. Each part of the body relates harmoniously to the whole. The slightly enlarged head, the broad shoulders tapering to a narrow waist — all follow mathematical ratios that the Greeks believed reflected cosmic order.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Principles of Art",
        "title": "Gradation",
        "definition": "Gradation is a gradual transition from one state to another — light to dark, large to small, warm to cool. It creates a sense of movement, depth, and visual interest.",
        "artwork": [
            {
                "image_src": "/images/principles/gradation.jpg",
                "attribution": "Mark Rothko, Seagram Murals, 1958–1959 — Fondation Louis Vuitton, Paris / Wikimedia Commons",
                "content_title": "How Gradation Works Here",
                "content": "The subtle transitions between colors or values create a sense of depth and atmosphere. Unlike abrupt contrasts, gradation invites the viewer to linger and explore the space between states, producing a meditative or immersive experience.",
                "meaning_label": "Meaning",
                "meaning_text": "Rothko's Seagram Murals are among the most powerful examples of gradation as expressive principle. The deep, dark panels with their soft, blurred rectangular forms create zones of transition that are impossible to locate precisely — the colors seem to hover, breathe, and pulse. Rothko intended viewers to be enveloped by color, experiencing something akin to a spiritual encounter.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Principles of Art",
        "title": "Harmony",
        "definition": "Harmony is the sense of unity and cohesion in a work — when all elements feel like they belong together. It is achieved through repetition of similar elements, consistent color schemes, or shared visual qualities.",
        "artwork": [
            {
                "image_src": "/images/principles/harmony.jpg",
                "attribution": "Claude Monet, Impression, Sunrise, 1872 — Musee Marmottan Monet, Paris / Wikimedia Commons",
                "content_title": "How Harmony Works Here",
                "content": "Every element in this composition feels connected and purposeful. The artist achieves harmony through a unified color palette, repeated shapes or motifs, and a consistent mood or atmosphere.",
                "meaning_label": "Meaning",
                "meaning_text": "This painting gave its name to an entire art movement — Impressionism. Monet captures a fleeting moment at the harbor of Le Havre, where the orange sun rises through a misty blue atmosphere. The harmony comes from the unified color palette of blues and oranges, the repeated brushstroke technique, and the enveloping haze that dissolves hard edges.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Principles of Art",
        "title": "Variety",
        "definition": "Variety introduces diversity and contrast to prevent monotony. It uses different elements — varied shapes, colors, textures, sizes — to create visual interest and complexity. The best works balance variety with harmony.",
        "artwork": [
            {
                "image_src": "/images/principles/variety.jpg",
                "attribution": "Pieter Bruegel the Elder, The Tower of Babel, 1563 — Kunsthistorisches Museum, Vienna / Wikimedia Commons",
                "content_title": "How Variety Works Here",
                "content": "This work is rich with diverse elements — multiple figures, varied activities, contrasting textures, and a wealth of visual detail. Each area offers something new to discover, rewarding close and repeated looking.",
                "meaning_label": "Meaning",
                "meaning_text": "Bruegel's Tower of Babel is a masterpiece of visual variety. The enormous tower dominates the composition, but every inch of the painting teems with activity — cranes lifting stone, workers carving arches, boats unloading cargo. The variety of architectural details, human activities, and landscape features creates an entire world within a single frame.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Principles of Art",
        "title": "Movement",
        "definition": "Movement is how the artist guides the viewer's eye through a composition and the suggestion of motion within the work. It can be literal (depicting things in motion) or implied (using lines, shapes, and composition to create a sense of flow).",
        "artwork": [
            {
                "image_src": "/images/principles/movement.jpg",
                "attribution": "Umberto Boccioni, Unique Forms of Continuity in Space, 1913 — Various collections / Wikimedia Commons",
                "content_title": "How Movement Works Here",
                "content": "The artist captures motion in a way that makes the static image feel alive. Curving lines, dynamic poses, and compositional flow all contribute to a sense of energy and direction.",
                "meaning_label": "Meaning",
                "meaning_text": "Boccioni's sculpture is the Futurist movement's most iconic work — a figure striding forward so forcefully that its body seems to dissolve into the air it moves through. The bronze figure has no arms or head; it is pure forward momentum. The flowing, flame-like forms trailing behind the legs suggest the displacement of air, the friction of speed.",
            }
        ],
    },
    {
        "type": "recap",
        "section_label": "Principles of Art",
        "title": "The Eight Principles — Recap",
        "items": [
            "**Rhythm** — Repetition creating visual tempo",
            "**Balance** — Distribution of visual weight (symmetrical or asymmetrical)",
            "**Emphasis (Contrast)** — Creating focal points through difference",
            "**Proportion** — Size relationships between elements",
            "**Gradation** — Gradual transitions creating depth and interest",
            "**Harmony** — Unity and cohesion across the composition",
            "**Variety** — Diversity preventing monotony",
            "**Movement** — Guiding the viewer's eye through the work",
        ],
        "footer_text": "Together, elements and principles create the full visual language.",
    },
    {
        "type": "section_intro",
        "section_label": "Interrelatedness",
        "section_number": "03",
        "title": "Elements and Principles Working Together",
        "description": "In real artworks, elements and principles don't exist in isolation. They interact, reinforce, and sometimes contradict each other to create meaning. Let's analyze specific works to see this interplay in action.",
    },
    {
        "type": "analysis",
        "section_label": "Interrelatedness",
        "title": "The Starry Night — Vincent van Gogh (1889)",
        "image_src": "/images/interrelatedness/starry-night.jpg",
        "attribution": "Vincent van Gogh, The Starry Night, 1889 — Museum of Modern Art, New York",
        "elements_at_play": [
            {
                "label": "Color",
                "description": "Deep blues and vibrant yellows create emotional intensity. The complementary color scheme makes the stars and moon appear to glow.",
            },
            {
                "label": "Line",
                "description": "Swirling, curving lines dominate the composition, creating energy and turbulence in the sky.",
            },
            {
                "label": "Value",
                "description": "Strong contrast between bright celestial bodies and the dark blue sky draws the eye.",
            },
        ],
        "principles_at_play": [
            {
                "label": "Rhythm",
                "description": "Repeated swirls and curves create a visual rhythm pulling the eye across the canvas in circular motion.",
            },
            {
                "label": "Movement",
                "description": "The swirling lines suggest motion — the sky appears alive and turbulent.",
            },
        ],
        "meaning_label": "Meaning",
        "meaning_text": "Painted from the window of Van Gogh's asylum room, The Starry Night expresses the artist's emotional turbulence and his vision of the night sky as a living, breathing force. The interplay of color (passion) with rhythm (energy) and movement (turbulence) creates a work that is both a landscape and an emotional self-portrait.",
    },
    {
        "type": "analysis",
        "section_label": "Interrelatedness",
        "title": "The Great Wave — Katsushika Hokusai (c. 1831)",
        "image_src": "/images/interrelatedness/great-wave.jpg",
        "attribution": "Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831",
        "elements_at_play": [
            {
                "label": "Line",
                "description": "The powerful contour line of the wave creates a claw-like shape that dominates the composition.",
            },
            {
                "label": "Form",
                "description": "The wave appears three-dimensional, towering over the tiny boats and Mount Fuji, creating dramatic scale.",
            },
            {
                "label": "Space",
                "description": "The vast empty sky contrasts with the dense, active foreground, creating tension.",
            },
        ],
        "principles_at_play": [
            {
                "label": "Balance",
                "description": "Asymmetrical balance — the massive wave on the left is counterweighted by Mount Fuji on the right.",
            },
            {
                "label": "Emphasis",
                "description": "The wave is the undeniable focal point, its size and position commanding immediate attention.",
            },
        ],
        "meaning_label": "Meaning",
        "meaning_text": "This iconic woodblock print captures the overwhelming power of nature against human fragility. The interplay of line, form, balance, and emphasis creates a meditation on humanity's relationship with nature — awe, respect, and vulnerability. Mount Fuji, distant and still, represents permanence against the wave's transient fury.",
    },
    {
        "type": "analysis",
        "section_label": "Interrelatedness",
        "title": "The Third of May 1808 — Francisco Goya (1814)",
        "image_src": "/images/interrelatedness/third-of-may.jpg",
        "attribution": "Francisco Goya, The Third of May 1808, 1814 — Museo del Prado, Madrid",
        "elements_at_play": [
            {
                "label": "Value",
                "description": "The stark contrast between the brightly lit central figure and the surrounding darkness creates a theatrical scene.",
            },
            {
                "label": "Shape",
                "description": "The angular firing squad contrasts with the organic, collapsing forms of the victims.",
            },
            {
                "label": "Color",
                "description": "The limited palette — dark earth tones with the brilliant white and yellow of the central figure's shirt.",
            },
        ],
        "principles_at_play": [
            {
                "label": "Contrast",
                "description": "Light vs. dark, individual vs. faceless group, life vs. death — every contrast heightens the drama.",
            },
            {
                "label": "Variety",
                "description": "The diverse reactions of the victims — defiance, prayer, collapse — create a panorama of human responses.",
            },
        ],
        "meaning_label": "Meaning",
        "meaning_text": "Goya's painting depicts the execution of Spanish civilians by Napoleon's soldiers. The interplay of value (the central figure illuminated like a secular crucifixion), contrast (the faceless firing squad vs. the expressive victims), and variety creates one of the most powerful anti-war images ever made.",
    },
    {
        "type": "recap",
        "section_label": "Interrelatedness",
        "title": "Key Takeaway",
        "items": [
            "Elements and principles are not separate categories.",
            "Every artwork uses them in combination:",
            "**Color + Rhythm + Movement** → emotional energy (Starry Night)",
            "**Line + Form + Balance + Emphasis** → dynamic tension (Great Wave)",
            "**Value + Shape + Contrast + Variety** → horror and empathy (Third of May 1808)",
        ],
        "footer_text": "Understanding art means seeing how these elements and principles interact to create meaning.",
    },
    {
        "type": "section_intro",
        "section_label": "Hybrid Art",
        "section_number": "04",
        "title": "When Art Forms Combine",
        "description": "Hybrid art blends two or more distinct art forms, mediums, or techniques into a single work. This fusion creates new expressive possibilities that neither form could achieve alone.",
    },
    {
        "type": "artwork",
        "section_label": "Hybrid Art",
        "title": "Digital Painting — Traditional Techniques Meet Digital Tools",
        "definition": "",
        "artwork": [
            {
                "image_src": "/images/hybrid/digital-painting.jpg",
                "attribution": "David Revoy, Alice in Wonderland, 2010 — Wikimedia Commons / CC BY 4.0",
                "content_title": "Art Forms Combined",
                "content": "**Traditional Oil Painting:** Brushwork techniques, color mixing, compositional principles from centuries of painting tradition, understanding of light and shadow.\n\n**Digital Art:** Digital tablets, layering software, undo/redo capabilities, digital brushes that mimic or transcend physical media, infinite color precision.",
                "meaning_label": "Meaning",
                "meaning_text": "Digital painting represents the evolution of artistic practice — artists carry the knowledge and techniques of traditional painting into a new medium. The result maintains the aesthetic warmth of oil painting while gaining the flexibility of digital tools. This hybrid form democratizes art-making while preserving the visual language of centuries of painting tradition.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Hybrid Art",
        "title": "Sculpture + Projection Mapping",
        "definition": "",
        "artwork": [
            {
                "image_src": "/images/hybrid/sculpture-projection.jpg",
                "attribution": "Adam Pizurny, Faces projected at FILE Electronic Language International Festival, 2017 — São Paulo, Brazil / Wikimedia Commons / CC BY-SA 4.0",
                "content_title": "Art Forms Combined",
                "content": "**Sculpture:** Three-dimensional physical form — stone, metal, or architectural structure — providing a tangible, permanent presence in space.\n\n**Projection Mapping:** Digital video and light projected onto the physical form, transforming the static object with animation, color, and motion.",
                "meaning_label": "Meaning",
                "meaning_text": "Projection mapping transforms permanent, static objects into dynamic, ever-changing experiences. The sculpture provides physical presence and cultural weight, while the projection brings it to life with narrative, color, and movement. This hybrid form questions the boundary between permanent and ephemeral art.",
            }
        ],
    },
    {
        "type": "artwork",
        "section_label": "Hybrid Art",
        "title": "Photography + Collage + Digital Manipulation",
        "definition": "",
        "artwork": [
            {
                "image_src": "/images/hybrid/photo-collage.jpg",
                "attribution": "Hannah Höch, Cut with the Kitchen Knife Dada Through the Last Weimar Beer-Belly Cultural Epoch in Germany, 1919 — Staatliche Museen zu Berlin / Wikimedia Commons",
                "content_title": "Art Forms Combined",
                "content": "**Photography:** Capturing reality through the lens — documentary truth, specific moments frozen in time.\n\n**Collage:** Cutting, arranging, and assembling multiple images to create a new composition that transcends any single photograph.\n\n**Digital Manipulation:** Software tools for blending, color grading, and compositing that enable seamless integration of disparate elements.",
                "meaning_label": "Meaning",
                "meaning_text": "Hannah Höch was a pioneer of photomontage, cutting up photographs from magazines to create new compositions that commented on politics, gender, and society. This hybrid form challenges the idea that a single photograph can capture truth. By combining multiple perspectives, the artist creates a more complete representation of experience.",
            }
        ],
    },
    {
        "type": "recap",
        "section_label": "Hybrid Art",
        "title": "Hybrid Art Pushes Boundaries",
        "items": [
            "**Digital + Traditional** → Preserves heritage while embracing new tools",
            "**Sculpture + Projection** → Transforms static objects into dynamic experiences",
            "**Photography + Collage + Digital** → Multiple perspectives in a single frame",
        ],
        "footer_text": "Hybrid art reflects our increasingly interconnected world — where boundaries between disciplines and technologies are constantly redefined.",
    },
    {
        "type": "summary",
        "title": "What We've Learned",
        "items": [
            {
                "label": "Elements of Art",
                "description": "The raw materials: Line, Shape, Form, Value, Space, Color, Texture",
            },
            {
                "label": "Principles of Art",
                "description": "The organizing rules: Rhythm, Balance, Emphasis, Proportion, Gradation, Harmony, Variety, Movement",
            },
            {
                "label": "Interrelatedness",
                "description": "Elements and principles work together in artworks to create meaning greater than the sum of their parts",
            },
            {
                "label": "Hybrid Art",
                "description": "The boundaries between art forms are fluid and constantly evolving, creating new possibilities for expression",
            },
        ],
        "closing_statement": "Art is a language. The elements are its vocabulary. The principles are its grammar. Together, they allow artists to communicate ideas, emotions, and perspectives that words alone cannot express.",
    },
    {
        "type": "references",
        "title": "Image Attributions",
        "sections": [
            {
                "section_name": "Elements of Art",
                "attributions": [
                    "Paul Klee, Ad Parnassum, 1927 — Kunstmuseum Bern / Google Art Project / Wikimedia Commons",
                    "Wassily Kandinsky, Composition VIII, 1923 — Guggenheim Museum / Google Art Project / Wikimedia Commons",
                    "Michelangelo, David, 1501–1504 — Galleria dell'Accademia, Florence / Wikimedia Commons",
                    "Caravaggio, The Calling of Saint Matthew, c. 1599–1600 — Contarelli Chapel, Rome / Wikimedia Commons",
                    "Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831 — Public Domain / Wikimedia Commons",
                    "Vincent van Gogh, Sunflowers, 1888 — National Gallery, London / Wikimedia Commons",
                    "Vincent van Gogh, The Starry Night, 1889 — MoMA, New York / Google Art Project / Wikimedia Commons",
                ],
            },
            {
                "section_name": "Principles of Art",
                "attributions": [
                    "Piet Mondrian, Composition with Red Blue and Yellow, 1930 — Kunstmuseum Basel / Wikimedia Commons",
                    "Leonardo da Vinci, The Last Supper, 1495–1498 — Santa Maria delle Grazie, Milan / Wikimedia Commons",
                    "Edvard Munch, The Scream, 1893 — National Gallery of Norway / Wikimedia Commons",
                    "Kouros of Anavyssos, c. 530 BCE — National Archaeological Museum, Athens / Wikimedia Commons",
                    "Mark Rothko, Seagram Murals, 1958–1959 — Fondation Louis Vuitton, Paris / Wikimedia Commons",
                    "Claude Monet, Impression, Sunrise, 1872 — Musee Marmottan Monet, Paris / Wikimedia Commons",
                    "Pieter Bruegel the Elder, The Tower of Babel, 1563 — Kunsthistorisches Museum, Vienna / Wikimedia Commons",
                    "Umberto Boccioni, Unique Forms of Continuity in Space, 1913 — Various collections / Wikimedia Commons",
                ],
            },
            {
                "section_name": "Interrelatedness",
                "attributions": [
                    "Vincent van Gogh, The Starry Night, 1889 — Museum of Modern Art, New York",
                    "Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831 — Public Domain / Wikimedia Commons",
                    "Francisco Goya, The Third of May 1808, 1814 — Museo del Prado, Madrid / Wikimedia Commons",
                ],
            },
            {
                "section_name": "Hybrid Art",
                "attributions": [
                    "David Revoy, Alice in Wonderland, 2010 — Wikimedia Commons / CC BY 4.0",
                    "Adam Pizurny, Faces at FILE Festival 2017 — Wikimedia Commons / CC BY-SA 4.0",
                    "Hannah Höch, Cut with the Kitchen Knife Dada, 1919 — Staatliche Museen zu Berlin / Wikimedia Commons",
                ],
            },
        ],
    },
    {
        "type": "quiz_mc",
        "section_label": "Review Questions",
        "title": "Multiple Choice",
        "questions": [
            {
                "number": 1,
                "question": "Which of the following is NOT one of the seven elements of art?",
                "options": ["Line", "Shape", "Rhythm", "Texture"],
            },
            {
                "number": 2,
                "question": "Form differs from shape because form has:",
                "options": [
                    "Color",
                    "Height, width, and depth",
                    "Texture",
                    "Boundaries",
                ],
            },
            {
                "number": 3,
                "question": "Which principle of art is created through the repetition of visual elements?",
                "options": ["Balance", "Rhythm", "Emphasis", "Proportion"],
            },
            {
                "number": 4,
                "question": "A gradual transition from one state to another (light to dark, large to small) is called:",
                "options": ["Harmony", "Gradation", "Variety", "Rhythm"],
            },
            {
                "number": 5,
                "question": "Color is composed of three components:",
                "options": [
                    "Line, shape, and form",
                    "Hue, saturation, and value",
                    "Light, dark, and medium",
                    "Warm, cool, and neutral",
                ],
            },
        ],
    },
    {
        "type": "quiz_true_false",
        "section_label": "Review Questions",
        "title": "True or False",
        "questions": [
            "Elements of art are the building blocks used to create a visual composition.",
            "Emphasis creates a focal point by using contrast to make certain elements stand out.",
            "Actual texture is physical and tactile, while implied texture is visual.",
            "Too much variety in a composition creates harmony.",
            "Movement in art can be literal (depicting motion) or implied (using compositional flow).",
        ],
    },
    {
        "type": "quiz_matching",
        "section_label": "Review Questions",
        "title": "Matching",
        "match_items": [
            {
                "term": "Line",
                "definition": "The distribution of visual weight in a composition",
            },
            {"term": "Value", "definition": "Marks that connect two points"},
            {
                "term": "Texture",
                "definition": "The lightness or darkness of a color or tone",
            },
            {
                "term": "Balance",
                "definition": "Creating a focal point through contrast",
            },
            {
                "term": "Emphasis",
                "definition": "The surface quality of an artwork — how it feels or appears to feel",
            },
        ],
    },
    {
        "type": "quiz_short_answer",
        "section_label": "Review Questions",
        "title": "Short Answer",
        "questions": [
            "Explain how elements and principles of art work together in a real artwork.",
        ],
    },
    {
        "type": "closing",
        "section_label": "Elements and Principles of Art",
        "title": "Questions?",
    },
]

# ── CSS ─────────────────────────────────────────────────────────────────────

CSS_STYLES = """
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

@page {
    size: A4 portrait;
    margin: 0;
}

html, body {
    margin: 0;
    padding: 0;
    background: #fff;
    font-family: "Georgia", "Times New Roman", serif;
    color: #1a1a1a;
    line-height: 1.6;
    font-size: 11pt;
}

.slide {
    page-break-after: always;
    page-break-inside: avoid;
    width: 210mm;
    min-height: 297mm;
    padding: 18mm 20mm 15mm;
    position: relative;
    background: #fff;
}

.slide:last-child {
    page-break-after: auto;
}

.slide::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2c3e50, #3498db, #2c3e50);
}

h1 {
    font-size: 28pt;
    font-weight: 700;
    color: #1a1a2e;
    letter-spacing: 0.5px;
    line-height: 1.2;
}

h2 {
    font-size: 20pt;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 8mm;
    line-height: 1.3;
}

h3 {
    font-size: 13pt;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 3mm;
    margin-top: 5mm;
}

p {
    margin-bottom: 3mm;
    text-align: justify;
    hyphens: auto;
}

.section-label-badge {
    display: inline-block;
    font-size: 8pt;
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #3498db;
    border: 1.5px solid #3498db;
    padding: 2mm 4mm;
    margin-bottom: 4mm;
    border-radius: 2px;
}

.section-label-text {
    display: block;
    font-size: 10pt;
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #7f8c8d;
    margin-bottom: 3mm;
}

.section-number {
    display: block;
    font-size: 48pt;
    font-weight: 700;
    color: #ecf0f1;
    font-family: "Helvetica Neue", Arial, sans-serif;
    line-height: 1;
    margin-bottom: 2mm;
}

.decorative-line {
    width: 60mm;
    height: 2px;
    background: linear-gradient(90deg, #3498db, transparent);
    margin: 6mm auto;
}

.decorative-diamond {
    font-size: 24pt;
    color: #3498db;
    margin: 6mm auto;
    text-align: center;
}

.title-slide .slide-content-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 220mm;
    text-align: center;
}

.title-main {
    font-size: 32pt;
    color: #1a1a2e;
    margin-bottom: 5mm;
    text-align: center;
}

.title-sub {
    font-size: 14pt;
    color: #7f8c8d;
    font-style: italic;
    margin-bottom: 8mm;
}

.section-intro-slide .slide-content-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 220mm;
    text-align: center;
}

.section-intro-slide h2 {
    font-size: 24pt;
    margin-top: 4mm;
    margin-bottom: 8mm;
}

.section-description {
    max-width: 150mm;
    font-size: 12pt;
    line-height: 1.8;
    color: #34495e;
    text-align: center;
}

.section-description p {
    text-align: center;
    margin-bottom: 4mm;
}

.definition {
    font-size: 11pt;
    font-style: italic;
    color: #555;
    border-left: 3px solid #3498db;
    padding-left: 4mm;
    margin-bottom: 6mm;
    background: #f8f9fa;
    padding: 3mm 4mm;
    border-radius: 0 3px 3px 0;
}

.artwork-layout {
    display: flex;
    gap: 6mm;
    margin-top: 4mm;
    align-items: flex-start;
}

.artwork-image-container {
    flex: 0 0 85mm;
    text-align: center;
}

.artwork-image {
    width: 85mm;
    height: 110mm;
    object-fit: cover;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.artwork-caption {
    font-size: 7.5pt;
    color: #999;
    font-style: italic;
    margin-top: 2mm;
    text-align: center;
    line-height: 1.4;
}

.artwork-text-content {
    flex: 1;
}

.artwork-text-content h3 {
    font-size: 12pt;
    margin-top: 4mm;
    margin-bottom: 2mm;
    color: #2c3e50;
}

.content-text, .meaning-text {
    font-size: 10pt;
    line-height: 1.65;
    color: #333;
    text-align: justify;
}

.meaning-text {
    border-top: 1px solid #eee;
    padding-top: 3mm;
    margin-top: 2mm;
}

.artwork-placeholder {
    width: 85mm;
    height: 110mm;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-style: italic;
    border-radius: 3px;
}

.recap-list {
    list-style: none;
    padding: 0;
    margin: 5mm 0;
}

.recap-list li {
    font-size: 11pt;
    padding: 3mm 0;
    border-bottom: 1px solid #ecf0f1;
    line-height: 1.5;
    color: #333;
}

.recap-list li:last-child {
    border-bottom: none;
}

.recap-list li strong {
    color: #2c3e50;
}

.recap-footer {
    font-size: 10pt;
    font-style: italic;
    color: #7f8c8d;
    margin-top: 8mm;
    text-align: center;
    border-top: 2px solid #ecf0f1;
    padding-top: 4mm;
}

.analysis-layout {
    display: flex;
    gap: 6mm;
    margin-top: 4mm;
}

.analysis-image-container {
    flex: 0 0 85mm;
    text-align: center;
}

.analysis-image {
    width: 85mm;
    height: 110mm;
    object-fit: cover;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.analysis-caption {
    font-size: 7.5pt;
    color: #999;
    font-style: italic;
    margin-top: 2mm;
    text-align: center;
}

.analysis-image-placeholder {
    width: 85mm;
    height: 110mm;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-style: italic;
    border-radius: 3px;
}

.analysis-content {
    flex: 1;
}

.analysis-section {
    margin-bottom: 4mm;
}

.analysis-section-title {
    font-size: 11pt;
    color: #3498db;
    margin-bottom: 2mm;
    font-family: "Helvetica Neue", Arial, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #ecf0f1;
    padding-bottom: 1mm;
}

.analysis-item {
    margin-bottom: 3mm;
    padding-left: 3mm;
    border-left: 2px solid #3498db;
}

.analysis-item-label {
    display: inline-block;
    font-size: 9pt;
    font-weight: 700;
    font-family: "Helvetica Neue", Arial, sans-serif;
    padding: 0.5mm 2mm;
    border-radius: 2px;
    margin-bottom: 1mm;
}

.element-label {
    background: #e8f4fd;
    color: #2980b9;
}

.principle-label {
    background: #fef9e7;
    color: #f39c12;
}

.analysis-item p {
    font-size: 9.5pt;
    color: #555;
    line-height: 1.5;
    margin-bottom: 0;
}

.summary-items {
    margin: 6mm 0;
}

.summary-item {
    padding: 4mm;
    margin-bottom: 4mm;
    background: #f8f9fa;
    border-left: 3px solid #3498db;
    border-radius: 0 3px 3px 0;
}

.summary-item h3 {
    font-size: 13pt;
    margin: 0 0 2mm;
    color: #2c3e50;
}

.summary-item p {
    font-size: 10.5pt;
    color: #555;
    margin: 0;
}

.closing-statement {
    margin-top: 8mm;
    padding: 5mm;
    background: #1a1a2e;
    color: #fff;
    border-radius: 3px;
    text-align: center;
}

.closing-statement p {
    font-size: 12pt;
    font-style: italic;
    color: #ecf0f1;
    text-align: center;
    margin: 0;
    line-height: 1.7;
}

.references-section {
    margin-bottom: 5mm;
}

.references-section h3 {
    font-size: 12pt;
    color: #3498db;
    font-family: "Helvetica Neue", Arial, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2mm;
    border-bottom: 1px solid #ecf0f1;
    padding-bottom: 1mm;
}

.references-section ul {
    list-style: none;
    padding: 0;
}

.references-section li {
    font-size: 9pt;
    color: #666;
    padding: 1.5mm 0;
    border-bottom: 1px dotted #eee;
    line-height: 1.4;
}

.references-section li:last-child {
    border-bottom: none;
}

.closing-slide .slide-content-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 220mm;
    text-align: center;
}

.closing-title {
    font-size: 36pt;
    color: #1a1a2e;
    margin: 4mm 0;
}

.quiz-slide {
    page-break-after: always;
    page-break-inside: avoid;
    width: 210mm;
    min-height: 297mm;
    padding: 18mm 20mm 15mm;
    position: relative;
    background: #fff;
}

.quiz-slide:last-child {
    page-break-after: auto;
}

.quiz-slide::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #8e44ad, #3498db, #8e44ad);
}

.quiz-question {
    margin-bottom: 5mm;
    padding: 4mm;
    background: #f8f9fa;
    border-left: 3px solid #8e44ad;
    border-radius: 0 3px 3px 0;
}

.quiz-question-number {
    display: inline-block;
    font-size: 9pt;
    font-weight: 700;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #8e44ad;
    margin-bottom: 1mm;
}

.quiz-question-text {
    font-size: 11pt;
    color: #333;
    margin-bottom: 2mm;
}

.quiz-options {
    list-style: none;
    padding: 0;
    margin: 0;
}

.quiz-options li {
    font-size: 10pt;
    color: #555;
    padding: 1.5mm 3mm;
    margin-bottom: 1mm;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
}

.quiz-options li::before {
    content: "○ ";
    color: #8e44ad;
    font-weight: 700;
}

.quiz-true-false-item {
    font-size: 10.5pt;
    color: #333;
    padding: 3mm 4mm;
    margin-bottom: 2mm;
    background: #f8f9fa;
    border-radius: 3px;
}

.quiz-true-false-item::after {
    content: "  True / False";
    color: #8e44ad;
    font-weight: 600;
    font-size: 9pt;
}

.quiz-matching-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 3mm;
}

.quiz-matching-table th {
    font-size: 10pt;
    font-weight: 700;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #8e44ad;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 2mm 3mm;
    border-bottom: 2px solid #8e44ad;
    text-align: left;
}

.quiz-matching-table td {
    font-size: 10pt;
    color: #333;
    padding: 2.5mm 3mm;
    border-bottom: 1px solid #eee;
}

.quiz-matching-table td:first-child {
    font-weight: 600;
    width: 30mm;
}

.quiz-short-answer {
    font-size: 11pt;
    color: #333;
    margin-bottom: 4mm;
}

.quiz-answer-lines {
    border-top: 1px solid #ccc;
    margin-top: 15mm;
}

.quiz-answer-lines div {
    border-bottom: 1px dotted #ddd;
    height: 10mm;
}

@media print {
    body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}
"""

# ── Slide renderers ─────────────────────────────────────────────────────────


def generate_title_slide(slide):
    return f"""
    <div class="slide title-slide">
        <div class="slide-content-center">
            <div class="decorative-line"></div>
            <h1 class="title-main">{slide["title"]}</h1>
            <p class="title-sub">{slide["subtitle"]}</p>
            <div class="decorative-line"></div>
        </div>
    </div>
    """


def generate_section_intro(slide):
    desc_html = render_markdown(slide.get("description", ""))
    return f"""
    <div class="slide section-intro-slide">
        <div class="slide-content-center">
            <span class="section-number">{slide.get("section_number", "")}</span>
            <span class="section-label-text">{slide["section_label"]}</span>
            <h2>{slide["title"]}</h2>
            <div class="section-description">{desc_html}</div>
        </div>
    </div>
    """


def generate_artwork_slide(slide):
    artwork = slide["artwork"][0]
    img_data = get_artwork_image_data(artwork["image_src"])
    if img_data:
        img_html = (
            f'<img src="{img_data}" alt="{slide["title"]}" class="artwork-image" />'
        )
    else:
        img_html = '<div class="artwork-placeholder">Image not available</div>'

    definition_html = (
        f'<p class="definition">{slide["definition"]}</p>'
        if slide.get("definition")
        else ""
    )
    content_html = render_markdown(artwork.get("content", ""))
    meaning_html = render_markdown(artwork.get("meaning_text", ""))

    return f"""
    <div class="slide artwork-slide">
        <span class="section-label-badge">{slide["section_label"]}</span>
        <h2>{slide["title"]}</h2>
        {definition_html}
        <div class="artwork-layout">
            <div class="artwork-image-container">
                {img_html}
                <p class="artwork-caption">{artwork.get("attribution", "")}</p>
            </div>
            <div class="artwork-text-content">
                <h3>{artwork.get("content_title", "")}</h3>
                <div class="content-text">{content_html}</div>
                <h3>{artwork.get("meaning_label", "Meaning")}</h3>
                <div class="meaning-text">{meaning_html}</div>
            </div>
        </div>
    </div>
    """


def generate_recap_slide(slide):
    items_html = "".join(
        f"<li>{render_markdown(item)}</li>" for item in slide.get("items", [])
    )
    footer_html = (
        f'<p class="recap-footer">{slide["footer_text"]}</p>'
        if slide.get("footer_text")
        else ""
    )

    return f"""
    <div class="slide recap-slide">
        <span class="section-label-badge">{slide["section_label"]}</span>
        <h2>{slide["title"]}</h2>
        <ul class="recap-list">{items_html}</ul>
        {footer_html}
    </div>
    """


def generate_analysis_slide(slide):
    img_data = get_artwork_image_data(slide["image_src"])
    if img_data:
        img_html = (
            f'<img src="{img_data}" alt="{slide["title"]}" class="analysis-image" />'
        )
    else:
        img_html = '<div class="analysis-image-placeholder">Image not available</div>'

    elements_html = ""
    for elem in slide.get("elements_at_play", []):
        elements_html += f"""
        <div class="analysis-item">
            <span class="analysis-item-label element-label">{elem["label"]}</span>
            <p>{elem["description"]}</p>
        </div>
        """

    principles_html = ""
    for princ in slide.get("principles_at_play", []):
        principles_html += f"""
        <div class="analysis-item">
            <span class="analysis-item-label principle-label">{princ["label"]}</span>
            <p>{princ["description"]}</p>
        </div>
        """

    meaning_html = render_markdown(slide.get("meaning_text", ""))

    return f"""
    <div class="slide analysis-slide">
        <span class="section-label-badge">{slide["section_label"]}</span>
        <h2>{slide["title"]}</h2>
        <div class="analysis-layout">
            <div class="analysis-image-container">
                {img_html}
                <p class="analysis-caption">{slide.get("attribution", "")}</p>
            </div>
            <div class="analysis-content">
                <div class="analysis-section">
                    <h3 class="analysis-section-title">Elements at Play</h3>
                    {elements_html}
                </div>
                <div class="analysis-section">
                    <h3 class="analysis-section-title">Principles at Play</h3>
                    {principles_html}
                </div>
                <div class="analysis-section">
                    <h3 class="analysis-section-title">{slide.get("meaning_label", "Meaning")}</h3>
                    <div class="meaning-text">{meaning_html}</div>
                </div>
            </div>
        </div>
    </div>
    """


def generate_summary_slide(slide):
    items_html = ""
    for item in slide.get("items", []):
        items_html += f"""
        <div class="summary-item">
            <h3>{item["label"]}</h3>
            <p>{item["description"]}</p>
        </div>
        """

    closing_html = ""
    if slide.get("closing_statement"):
        closing_html = (
            f'<div class="closing-statement"><p>{slide["closing_statement"]}</p></div>'
        )

    return f"""
    <div class="slide summary-slide">
        <h2>{slide["title"]}</h2>
        <div class="summary-items">{items_html}</div>
        {closing_html}
    </div>
    """


def generate_references_slide(slide):
    sections_html = ""
    for section in slide.get("sections", []):
        attributions_html = "".join(
            f"<li>{attr}</li>" for attr in section.get("attributions", [])
        )
        sections_html += f"""
        <div class="references-section">
            <h3>{section["section_name"]}</h3>
            <ul>{attributions_html}</ul>
        </div>
        """

    return f"""
    <div class="slide references-slide">
        <h2>{slide["title"]}</h2>
        {sections_html}
    </div>
    """


def generate_closing_slide(slide):
    return f"""
    <div class="slide closing-slide">
        <div class="slide-content-center">
            <div class="decorative-line"></div>
            <span class="section-label-text">{slide.get("section_label", "")}</span>
            <h1 class="closing-title">{slide["title"]}</h1>
            <div class="decorative-diamond">&#9670;</div>
            <div class="decorative-line"></div>
        </div>
    </div>
    """


def generate_quiz_mc(slide):
    questions_html = ""
    for q in slide.get("questions", []):
        options_html = "".join(f"<li>{opt}</li>" for opt in q.get("options", []))
        questions_html += f"""
        <div class="quiz-question">
            <span class="quiz-question-number">Question {q["number"]}</span>
            <p class="quiz-question-text">{q["question"]}</p>
            <ul class="quiz-options">{options_html}</ul>
        </div>
        """
    return f"""
    <div class="slide quiz-slide">
        <span class="section-label-badge">{slide["section_label"]}</span>
        <h2>{slide["title"]}</h2>
        {questions_html}
    </div>
    """


def generate_quiz_true_false(slide):
    items_html = ""
    for q in slide.get("questions", []):
        items_html += f'<div class="quiz-true-false-item">{q}</div>'
    return f"""
    <div class="slide quiz-slide">
        <span class="section-label-badge">{slide["section_label"]}</span>
        <h2>{slide["title"]}</h2>
        {items_html}
    </div>
    """


def generate_quiz_matching(slide):
    rows_html = ""
    for item in slide.get("match_items", []):
        rows_html += f"""
        <tr>
            <td>{item["term"]}</td>
            <td></td>
        </tr>
        """
    return f"""
    <div class="slide quiz-slide">
        <span class="section-label-badge">{slide["section_label"]}</span>
        <h2>{slide["title"]}</h2>
        <p style="font-size:10pt;color:#777;margin-bottom:4mm;">Match each term with its correct definition.</p>
        <table class="quiz-matching-table">
            <thead><tr><th>Term</th><th>Definition</th></tr></thead>
            <tbody>{rows_html}</tbody>
        </table>
        <div class="quiz-answer-lines">
            <div></div><div></div><div></div><div></div><div></div>
        </div>
    </div>
    """


def generate_quiz_short_answer(slide):
    questions_html = ""
    for q in slide.get("questions", []):
        questions_html += f'<p class="quiz-short-answer">{q}</p>'
    return f"""
    <div class="slide quiz-slide">
        <span class="section-label-badge">{slide["section_label"]}</span>
        <h2>{slide["title"]}</h2>
        {questions_html}
        <div class="quiz-answer-lines">
            <div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div>
        </div>
    </div>
    """


SLIDE_RENDERERS = {
    "title": generate_title_slide,
    "section_intro": generate_section_intro,
    "artwork": generate_artwork_slide,
    "recap": generate_recap_slide,
    "analysis": generate_analysis_slide,
    "summary": generate_summary_slide,
    "references": generate_references_slide,
    "quiz_mc": generate_quiz_mc,
    "quiz_true_false": generate_quiz_true_false,
    "quiz_matching": generate_quiz_matching,
    "quiz_short_answer": generate_quiz_short_answer,
    "closing": generate_closing_slide,
}


def generate_html():
    slides_html = ""
    for slide in SLIDES:
        renderer = SLIDE_RENDERERS.get(slide["type"])
        if renderer:
            slides_html += renderer(slide)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>{CSS_STYLES}</style>
</head>
<body>
{slides_html}
</body>
</html>"""


def main():
    print("Generating HTML...")
    html_content = generate_html()

    print("Converting to PDF...")
    html_doc = HTML(string=html_content)
    html_doc.write_pdf(str(OUTPUT_PATH))
    print(f"PDF saved to: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
