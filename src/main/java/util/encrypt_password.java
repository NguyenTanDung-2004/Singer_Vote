package util;

import java.security.MessageDigest;

public class encrypt_password {
	private static String add = "asdfasdfasd;@asdfasdfasd.?";
	public String ecrypt_to_SHA1(String str) {
		String result = null;
		String s = str + add;
		try {
			byte[] data_to_byte = s.getBytes("UTF-8");
			MessageDigest md = MessageDigest.getInstance("SHA-1");
			result = org.apache.tomcat.util.codec.binary.Base64.encodeBase64String(data_to_byte);
		}
		catch(Exception e) {
			System.out.println(e);
		}
		return result;
	}
}
