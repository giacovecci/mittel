---
title: Alfalfa
date: 2025-04-16T22:48:00.000Z
thumbnail: /uploads/screenshot-2025-03-02-142044.png
contentBlocks:
  - twoColumn:
      left: >
        ### Overview


        Project Alpha was our first major undertaking in the **foobar** sector. The primary goal was to streamline the user onboarding process.


        *   Reduced clicks by 40%

        *   Improved task completion rate

        *   Gathered positive user feedback
      right: >
        ### Technology Stack


        We leveraged a modern stack to ensure scalability and maintainability.


        1.  **Frontend:** Astro + Preact

        2.  **Styling:** Tailwind CSS

        3.  **Backend:** Supabase (Postgres, Auth)

        4.  **Deployment:** Vercel


        > This combination provided rapid development cycles and a robust final product.
  - fullWidthImage:
      image: /uploads/project-alpha-screenshot-1.png
      alt: Screenshot showing the main dashboard of Project Alpha
  - twoColumn:
      left: >
        #### Challenges


        Integrating the legacy authentication system presented a significant hurdle. We addressed this by implementing a temporary adapter pattern while phasing out the old system.
      right: |
        #### Key Learnings

        *   Clear API contracts are crucial.
        *   User testing early and often saves time.
        *   Don't underestimate deployment complexities.
  - fullWidthEmbed:
      embedCode: <iframe width="560" height="315"
        src="https://www.youtube-nocookie.com/embed/GVBKEOlAitg?si=8Cvx7jvMe50rpVZa"
        title="YouTube video player" frameborder="0" allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope;
        picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
---

<!-- Note: Markdown content placed *outside* the frontmatter (after the closing ---) is typically accessed via `entry.body` when using `getCollection`. Since we are relying *only* on `contentBlocks` in `FeedEntry.astro`, this area will be ignored by our current setup. -->

This is the main body content area of the Markdown file. Our current `FeedEntry.astro` component **does not** render this part because it focuses exclusively on the `contentBlocks` defined in the frontmatter above.
