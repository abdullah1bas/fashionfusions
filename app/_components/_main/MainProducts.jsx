/* eslint-disable react/prop-types */
import { Box, Button, Rating, Stack, Tooltip, Typography, Card, CardActions, CardContent, CardMedia, Zoom} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const MainProducts = ({ filteredProducts, setClickedProduct, handleOpenDialog }) => {
  const {t} = useTranslation();
  
  
  const { selectedProductsID } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-wrap justify-center sm:justify-between" >
      {/* AnimatePresence da 3hsan lw 7bat delete 3nasr yfdl sh8al */}
      <AnimatePresence>
        {filteredProducts.length > 0 ? filteredProducts.map((item) => {
          return (
            // example {framer motion filter animation website}
            <Card component={motion.section} layout
              // first State
              initial={{ transform: "scale(0)" }}
              // Last State
              animate={{ transform: "scale(1)" }}
              transition={{ duration: 1.6, type: "spring", stiffness: 60 }}
              exit={{ transform: "scale(0)" }}
              key={item.id}
              sx={{ maxWidth: 333, mt: 6, ":hover .MuiCardMedia-root ": { rotate: "1deg", scale: "1.1", transition: "0.35s",},}}
            >
              <Box sx={{ overflow: "hidden" }}>
                <CardMedia sx={{ height: 277, backgroundSize: "contain" }} image={item.image} title={item.title} />
              </Box>

              <CardContent>
                <div className="flex justify-between items-center">
                  <Typography gutterBottom variant="h6" component="h3" sx={{ textTransform: "capitalize !important" }} className="line-clamp-1">
                    {item.title}
                  </Typography>

                  <Typography variant="subtitle1" component="p"> ${item.price}</Typography>
                </div>

                <Typography sx={{ height: "100px", overflow: "auto" }} variant="body2" color="text.secondary">{item.description}</Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between" }}>
                <Tooltip TransitionComponent={Zoom} title={t("Details Product")}>
                  <Button sx={{ textTransform: "capitalize" }} size="large"
                    onClick={() => {
                      handleOpenDialog(true);
                      setClickedProduct(item);
                    }}>
                    {selectedProductsID.some((id) => id == item.id) && ( <AddShoppingCartOutlinedIcon sx={{ mr: 1 }} fontSize="small" /> )}
                    {t('Show Details')}
                  </Button>
                </Tooltip>
                  {/* // precision da y3ne b2olo an y7ot al value lw kan 3ashre */}
                <Rating name="read-only" value={item.rating.rate} readOnly precision={0.1}/>
              </CardActions>
            </Card>
          );
        }) :  <div className="w-full h-[50vh] flex justify-center items-center"> <p>{t("No products found")}</p> </div>} 
      </AnimatePresence>
    </div>
  );
};

export default MainProducts;
