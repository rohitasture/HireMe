export const getCategories = (cat) => {
  switch (cat) {
    case "all":
      return "All services";
    case "business":
      return "Business Services";
    case "lifestyle":
      return "Lifestyle related Services";
    case "digmarket":
      return "Digital Marketing services";
    case "write":
      return "Writing and Translation services";
    case "design":
      return "UI/UX Logo design services";
    case "ai":
      return "AI related services";
    case "animation":
      return "Video and Animation Services";
    case "music":
      return "Music and Audio Creation Services";
    case "web":
      return "Web Development Services";
    case "photo":
      return "Photography Services";
    default:
      return "All Services";
  }
};
