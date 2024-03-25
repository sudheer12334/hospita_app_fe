import './footer.css';

const Footer=()=>{
   return(
    <>
    <footer>
        <div class="footer-divs">
           <div>
            <div class="footer-label">Tel</div>
            <div className="contact" >040 68334455</div>
        </div> 
        <div>
            <div class="footer-label">Mail</div>
            <div className="mail">Logo@outlook.com</div>
        </div>
         <div>
            <div class="footer-label">Address</div>
            <div className="addre">706 Campfire Ave. Meriden, CT 06450</div>
         </div>   
         <div>
            <div class="footer-label">Fax</div>
            <div className="fax">+1-000-0000</div>
         </div>
        </div>
        <div className="copy">
            <p>&#169;Copyright 2024,All Rights Reserved</p>
        </div>
    </footer>
    </>
   )
}
export default Footer;